<?php
// Username
if (isset($_GET['username'])) {
    $username = htmlentities($_GET['username']);
}

$key = "EE028473488E26E1424E67B209A3C423";

// Path to our font file
$font = '../fonts/arial.ttf';
$font_bold = '../fonts/arialbd.ttf';

// Get JSON
$data = json_decode(file_get_contents('http://api.ustream.tv/json/channel/live/search/username:eq:' . $username . '?key=' . $key));

if ($data->results != null) {
    // Strings
    $live = "LIVE";
    $game = $data->results[0]->title;
    $viewers = $data->results[0]->viewersNow;

    // Image
    if ($data->results[0]->imageUrl->small) {
        $image = $data->results[0]->imageUrl->small;
    } else {
        $image = "../img/ustream-no-image.png";
    }
    $image_live = "../img/live.png";
    $image_eye = "../img/eye.png";

    // Calculate the image width based on strings of text
    $bbox = imagettfbbox(20, 0, $font_bold, $username);
    $width1 = abs($bbox[2] - $bbox[0]) + 85;

    $bbox = imagettfbbox(10, 0, $font_bold, $game);
    $width2 = abs($bbox[2] - $bbox[0]) + 125;

    if (($width1 < 300) && ($width2 < 300)) {
        $iWidth = 300;
    } else if ($width1 > $width2) {
        $iWidth = $width1;
    } else if ($width2 > $width1) {
        $iWidth = $width2;
    }

    // Create the base image
    $im = imagecreatetruecolor($iWidth, 64);

    // Colors
    $title_text_color = imagecolorallocate($im, 36, 135, 254);
    $black_text_color = imagecolorallocate($im, 38, 38, 38);
    $gray_text_color = imagecolorallocate($im, 102, 102, 102);
    $bg_color = imagecolorallocate($im, 255, 255, 255);

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
    imagecopyresized($im, $icon, 0, 0, 0, 0, 64, 64, $iconWidth, $iconHeight);

    // Live icon
    $live_icon = imagecreatefrompng($image_live); //png file

    imagealphablending($icon, true);

    $iconWidth=imagesx($live_icon);
    $iconHeight=imagesy($live_icon);

    // Paste the logo
    imagecopy($im, $live_icon, 106, 30, 0, 0, $iconWidth, $iconHeight);

    // Viewers icon
    $eye_icon = imagecreatefrompng($image_eye); //png file

    imagealphablending($icon, true);

    $iconWidth=imagesx($eye_icon);
    $iconHeight=imagesy($eye_icon);

    // Paste the logo
    imagecopy($im, $eye_icon, 76, 45, 0, 0, $iconWidth, $iconHeight);

    // Username
    // ------------------------------
    // First we create our bounding box for the username text
    $bbox = imagettfbbox(20, 0, $font_bold, $username);

    // This is our cordinates for X and Y
    $x = 74;
    $y = 22;

    // Write it
    imagettftext($im, 16, 0, $x, $y, $title_text_color, $font_bold, $username);

    // Live
    // ------------------------------
    // Create the next bounding box for the live text
    $bbox = imagettfbbox(10, 0, $font_bold, $live);

    // Set the cordinates so its next to the first text
    $x = 74;
    $y = 41;

    // Write it
    imagettftext($im, 10, 0, $x, $y, $black_text_color, $font_bold, $live);

    // Game
    // ------------------------------
    // Create the next bounding box for the game text
    $bbox = imagettfbbox(10, 0, $font_bold, $game);

    // Set the cordinates so its next to the first text
    $x = 122;
    $y = 41;

    // Write it
    imagettftext($im, 10, 0, $x, $y, $black_text_color, $font, $game);

    // Viewers
    // ------------------------------
    // Create the next bounding box for the viewers text
    $bbox = imagettfbbox(10, 0, $font, $viewers);

    // Set the cordinates so its next to the second text
    $x = 98;
    $y = 57;

    // Write it
    imagettftext($im, 8, 0, $x, $y, $gray_text_color, $font, $viewers);
} else {
    // Channel data
    $data = json_decode(file_get_contents('http://api.ustream.tv/json/user/' . $username . '/getInfo?key=' . $key));

    if ($data->results != null) {

        // Strings
        $offline = "Offline";

        // Image
        if ($data->results->imageUrl->small) {
            $image = $data->results->imageUrl->small;
        } else {
            $image = "../img/ustream-no-image.png";
        }

        // Calculate the image width based on strings of text
        $bbox = imagettfbbox(20, 0, $font_bold, $username);
        $width1 = abs($bbox[2] - $bbox[0]) + 85;

        if ($width1 < 300) {
            $iWidth = 300;
        } else {
            $iWidth = $width1;
        }

        // Create an image
        $im = imagecreatetruecolor($iWidth, 64);

        // Colors
        $title_text_color = imagecolorallocate($im, 36, 135, 254);
        $black_text_color = imagecolorallocate($im, 38, 38, 38);
        $gray_text_color = imagecolorallocate($im, 102, 102, 102);
        $bg_color = imagecolorallocate($im, 255, 255, 255);

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
        imagecopyresized($im, $icon, 0, 0, 0, 0, 64, 64, $iconWidth, $iconHeight);

        // Username
        // ------------------------------
        // First we create our bounding box for the username text
        $bbox = imagettfbbox(20, 0, $font_bold, $username);

        // This is our cordinates for X and Y
        $x = 74;
        $y = 22;

        // Write it
        imagettftext($im, 16, 0, $x, $y, $title_text_color, $font_bold, $username);

        // Offline
        // ------------------------------
        // Create the next bounding box for the offline text
        $bbox = imagettfbbox(10, 0, $font_bold, $offline);

        // Set the cordinates so its next to the first text
        $x = 74;
        $y = 41;

        // Write it
        imagettftext($im, 10, 0, $x, $y, $black_text_color, $font_bold, $offline);
    } else {
        // Strings
        $offline = "Not available.";

        // Images
        $image = "../img/ustream-no-image.png";

        // Calculate the image width based on strings of text
        $bbox = imagettfbbox(20, 0, $font_bold, $username);
        $width1 = abs($bbox[2] - $bbox[0]) + 85;

        if ($width1 < 300) {
            $iWidth = 300;
        } else {
            $iWidth = $width1;
        }

        // Create an image
        $im = imagecreatetruecolor($iWidth, 64);

        // Colors
        $title_text_color = imagecolorallocate($im, 36, 135, 254);
        $black_text_color = imagecolorallocate($im, 38, 38, 38);
        $gray_text_color = imagecolorallocate($im, 102, 102, 102);
        $bg_color = imagecolorallocate($im, 255, 255, 255);

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
        imagecopyresized($im, $icon, 0, 0, 0, 0, 64, 64, $iconWidth, $iconHeight);

        // Username
        // ------------------------------
        // First we create our bounding box for the username text
        $bbox = imagettfbbox(20, 0, $font_bold, $username);

        // This is our cordinates for X and Y
        $x = 74;
        $y = 22;

        // Write it
        imagettftext($im, 16, 0, $x, $y, $title_text_color, $font_bold, $username);

        // Offline
        // ------------------------------
        // Create the next bounding box for the offline text
        $bbox = imagettfbbox(10, 0, $font_bold, $offline);

        // Set the cordinates so its next to the first text
        $x = 74;
        $y = 41;

        // Write it
        imagettftext($im, 10, 0, $x, $y, $black_text_color, $font_bold, $offline);
    }
}

// Output to browser
header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);

?>