<?php
function ellipsis($text) {
    $max = 30;
    $append = '...';

    if (strlen($text) <= $max) {
        return $text;
    }

    $out = substr($text,0,$max);

    /*if (strpos($text,' ') === FALSE) {
        return $out . $append;
    }*/

    return preg_replace('/\w+$/', '', $out) . $append;
}

// Username
if (isset($_GET['username'])) {
    $username = htmlentities($_GET['username']);
}

// Path to our font file
$font = '../fonts/arial.ttf';
$font_bold = '../fonts/arialbd.ttf';

// Colors
$title_text_color_1 = 0;
$title_text_color_2 = 102;
$title_text_color_3 = 204;

$black_text_color_1 = 38;
$black_text_color_2 = 38;
$black_text_color_3 = 38;

$gray_text_color_1 = 128;
$gray_text_color_2 = 128;
$gray_text_color_3 = 128;

$bg_color_1 = 243;
$bg_color_2 = 243;
$bg_color_3 = 243;

// Username
$username_font_size = 12;
$username_x = 64;
$username_y = 23;

// Live
$live_font_size = 9;
$live_x = 64;
$live_y = 38;

// Live icon
$live_icon_x = 91;
$live_icon_y = 29;

// Game
$game_font_size = 9;
$game_x = 103;
$game_y = 38;

// Eye icon
$eye_icon_x = 64;
$eye_icon_y = 41;

// Viewers
$viewers_font_size = 7.5;
$viewers_x = 81;
$viewers_y = 52;

// Get JSON
$data = json_decode(file_get_contents('http://api.justin.tv/api/stream/list.json?channel=' . $username));

if ($data) {
    // Strings
    $live = "LIVE";
    $game = $data[0]->title;
    $game = ellipsis($game);
    $viewers = $data[0]->channel_count;

    // Images
    if ($data[0]->channel->image_url_small) {
        $image = $data[0]->channel->image_url_small;
    } else {
        $image = "../img/justin-no-image.png";
    }
    $image_live = "../img/live.png";
    $image_eye = "../img/eye-gray.png";

    // Calculate the image width based on strings of text
    $bbox = imagettfbbox($username_font_size, 0, $font_bold, $username);
    $width1 = abs($bbox[2] - $bbox[0]) + 75;

    $bbox = imagettfbbox($game_font_size, 0, $font_bold, $game);
    $width2 = abs($bbox[2] - $bbox[0]) + 110;

    if (($width1 < 300) && ($width2 < 300)) {
        $iWidth = 300;
    } else if ($width1 > $width2) {
        $iWidth = $width1;
    } else if ($width2 > $width1) {
        $iWidth = $width2;
    }

    // Create the base image
    $im = imagecreatetruecolor(300, 64);

    // Colors
    $title_text_color = imagecolorallocate($im, $title_text_color_1, $title_text_color_2, $title_text_color_3);
    $black_text_color = imagecolorallocate($im, $black_text_color_1, $black_text_color_2, $black_text_color_3);
    $gray_text_color = imagecolorallocate($im, $gray_text_color_1, $gray_text_color_2, $gray_text_color_3);
    $bg_color = imagecolorallocate($im, $bg_color_1, $bg_color_1, $bg_color_1);

    // Set the background
    imagefilledrectangle($im, 0, 0, 300, 64, $bg_color);

    // User icon
    $size=getimagesize($image);
    switch($size["mime"]){
        case "image/jpeg":
            $icon = imagecreatefromjpeg($image); //jpeg file
        break;
        case "image/gif":
            $icon = imagecreatefromgif($image); //gif file
      break;
      case "image/png":
          $icon = imagecreatefrompng($image); //png file
      break;
    default:
        break;
    break;
    }

    imagealphablending($icon, true);

    $iconWidth=imagesx($icon);
    $iconHeight=imagesy($icon);

    // Paste the logo
    imagecopyresampled($im, $icon, 10, 10, 0, 0, 44, 44, $iconWidth, $iconHeight);

    // Live icon
    $live_icon = imagecreatefrompng($image_live); //png file

    imagealphablending($icon, true);

    $iconWidth=imagesx($live_icon);
    $iconHeight=imagesy($live_icon);

    // Paste the logo
    imagecopy($im, $live_icon, $live_icon_x, $live_icon_y, 0, 0, $iconWidth, $iconHeight);

    // Eye icon
    $eye_icon = imagecreatefrompng($image_eye); //png file

    imagealphablending($icon, true);

    $iconWidth=imagesx($eye_icon);
    $iconHeight=imagesy($eye_icon);

    // Paste the logo
    imagecopy($im, $eye_icon, $eye_icon_x, $eye_icon_y, 0, 0, $iconWidth, $iconHeight);

    // Username
    // ------------------------------
    // First we create our bounding box for the username text
    $bbox = imagettfbbox($username_font_size, 0, $font_bold, $username);

    // Write it
    imagettftext($im, $username_font_size, 0, $username_x, $username_y, $title_text_color, $font_bold, $username);

    // Live
    // ------------------------------
    // Create the next bounding box for the live text
    $bbox = imagettfbbox($live_font_size, 0, $font_bold, $live);

    // Write it
    imagettftext($im, $live_font_size, 0, $live_x, $live_y, $black_text_color, $font_bold, $live);

    // Game
    // ------------------------------
    // Create the next bounding box for the game text
    $bbox = imagettfbbox($game_font_size, 0, $font_bold, $game);

    // Write it
    imagettftext($im, $game_font_size, 0, $game_x, $game_y, $black_text_color, $font, $game);

    // Viewers
    // ------------------------------
    // Create the next bounding box for the viewers text
    $bbox = imagettfbbox($viewers_font_size, 0, $font, $viewers);

    // Write it
    imagettftext($im, $viewers_font_size, 0, $viewers_x, $viewers_y, $gray_text_color, $font, $viewers);
} else {
    // Channel data
    $data = json_decode(file_get_contents('http://api.justin.tv/api/channel/show/list.json?channel=' . $username));

    // Strings
    $offline = "Offline";

    // Image
    if ($data->image_url_small) {
        $image = $data->image_url_small;
    } else {
        $image = "../img/justin-no-image.png";
    }

    // Calculate the image width based on strings of text
    $bbox = imagettfbbox($username_font_size, 0, $font_bold, $username);
    $width1 = abs($bbox[2] - $bbox[0]) + 75;

    if ($width1 < 300) {
        $iWidth = 300;
    } else {
        $iWidth = $width1;
    }

    // Create an image
    $im = imagecreatetruecolor($iWidth, 64);

    // Colors
    $title_text_color = imagecolorallocate($im, $title_text_color_1, $title_text_color_2, $title_text_color_3);
    $black_text_color = imagecolorallocate($im, $black_text_color_1, $black_text_color_2, $black_text_color_3);
    $gray_text_color = imagecolorallocate($im, $gray_text_color_1, $gray_text_color_2, $gray_text_color_3);
    $bg_color = imagecolorallocate($im, $bg_color_1, $bg_color_1, $bg_color_1);

    // Set the background
    imagefilledrectangle($im, 0, 0, $iWidth, 64, $bg_color);

    // User icon
    $size=getimagesize($image);
    switch($size["mime"]){
        case "image/jpeg":
            $icon = imagecreatefromjpeg($image); //jpeg file
        break;
        case "image/gif":
            $icon = imagecreatefromgif($image); //gif file
      break;
      case "image/png":
          $icon = imagecreatefrompng($image); //png file
      break;
    default:
        break;
    break;
    }

    imagealphablending($icon, true);

    $iconWidth=imagesx($icon);
    $iconHeight=imagesy($icon);

    // Paste the logo
    imagecopyresampled($im, $icon, 10, 10, 0, 0, 44, 44, $iconWidth, $iconHeight);

    // Username
    // ------------------------------
    // First we create our bounding box for the username text
    $bbox = imagettfbbox($username_font_size, 0, $font_bold, $username);

    // Write it
    imagettftext($im, $username_font_size, 0, $username_x, $username_y, $title_text_color, $font_bold, $username);

    // Offline
    // ------------------------------
    // Create the next bounding box for the offline text
    $bbox = imagettfbbox($live_font_size, 0, $font_bold, $offline);

    // Write it
    imagettftext($im, $live_font_size, 0, $live_x, $live_y, $black_text_color, $font_bold, $offline);
}

// php-ga
require_once("../php-ga/autoload.php");
use UnitedPrototype\GoogleAnalytics;
$tracker = new GoogleAnalytics\Tracker('UA-37973757-2', 'streambadge.com');
$visitor = new GoogleAnalytics\Visitor();
$visitor->setIpAddress($_SERVER['REMOTE_ADDR']);
$visitor->setUserAgent($_SERVER['HTTP_USER_AGENT']);
$session = new GoogleAnalytics\Session();
$page = new GoogleAnalytics\Page('/justin/badge.php?' . $_SERVER['QUERY_STRING'] . '-' . $_SERVER['HTTP_REFERER']);
$page->setTitle('Justin.tv (image badge)');
$tracker->trackPageview($page, $session, $visitor);

// Output to browser
header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);
?>