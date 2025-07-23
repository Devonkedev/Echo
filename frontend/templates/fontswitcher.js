    window.onload = function () {

      const fontToggle = document.getElementById('dyslexicFontSwitch');
   
      if (localStorage.getItem("dyslexicFontSwitch")) {
        document.body.style.fontFamily = "'OpenDyslexic', sans-serif";
        fontToggle.checked = true;
      }
    
      fontToggle.addEventListener('change', function () {
        if (fontToggle.checked) {
          document.body.style.fontFamily = "'OpenDyslexic', sans-serif";
          localStorage.setItem("dyslexicFontSwitch", "true");
        } else {
          document.body.style.fontFamily = 'Segoe UI', Arial, sans-serif;
          localStorage.removeItem("dyslexicFontSwitch");
        }
      });
    
      const colorSwitches = [
        document.getElementById('darkModeSwitch'),
        document.getElementById('contrastModeSwitch'),
        document.getElementById('colorBlindSwitch')
      ];
    
      colorSwitches.forEach((sw, idx) => {
        sw.addEventListener('change', function () {
          if (sw.checked) {
            colorSwitches.forEach((other, i) => {
              if (i !== idx) other.checked = false;
            });
          }
        });
      });
    };
