function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  
  /*An array containing all the country names in the world:*/
  var countrycode = ["93 Afghanistan ","355 Albania ","213 Algeria ","376 Andorra","244 Angola","1-264 Anguilla","1-268 Antigua & Barbuda","54 Argentina","374 Armenia","297 Aruba","61 Australia","43 Austria","994 Azerbaijan","1-242 Bahamas","973 Bahrain","880 Bangladesh","1-246 Barbados","375 Belarus","32 Belgium","501 Belize","229 Benin","1-441 Bermuda","975 Bhutan","591 Bolivia","387 Bosnia & Herzegovina","267 Botswana","55 Brazil","1-284 British Virgin Islands","673 Brunei","359 Bulgaria","226 Burkina Faso","257 Burundi","855 Cambodia","237 Cameroon","1 Canada","238 Cape Verde","1-345 Cayman Islands","236 Central Arfrican Republic","235 Chad","56 Chile","86 China","57 Colombia","269 Comoros","242 Congo (Republic of)","243 Congo (Democratic Republic of)","682 Cook Islands","506 Costa Rica","385 Croatia","53 Cuba"," 599 Curacao","357 Cyprus","420 Czech Republic","45 Denmark","253 Djibouti","1-767 Dominica","1-809, 1-829, 1-849 Dominican Republic","593 Ecuador","20 Egypt","503 El Salvador","240 Equatorial Guinea","291 Eritrea","372 Estonia","251 Ethiopia","500 Falkland Islands","298 Faroe Islands","679 Fiji","358 Finland","33 France","689 French Polynesia","French West Indies","241 Gabon","220 Gambia","995 Georgia","49 Germany","233 Ghana","350 Gibraltar","30 Greece","299 Greenland","Grenada 1-473","1-671 Guam","502 Guatemala","44-1481 Guernsey","224 Guinea","245 Guinea Bissau","592 Guyana","509 Haiti","504 Honduras","852 Hong Kong","36 Hungary","354 Iceland","91 India","62 Indonesia","98 Iran","964 Iraq","353 Ireland","44-1624 Isle of Man","972 Israel","39 Italy","225 Ivory Coast","1-876 Jamaica","81 Japan","44-1534 Jersey","962 Jordan","7 Kazakhstan","254 Kenya","686 Kiribati","383 Kosovo","965 Kuwait","996 Kyrgyzstan","856 Laos","371 Latvia","961 Lebanon","266 Lesotho","231 Liberia","218 Libya","423 Liechtenstein","370 Lithuania","352 Luxembourg","853 Macau","389 Macedonia","261 Madagascar","265 Malawi","60 Malaysia","960 Maldives","223 Mali","356 Malta","692 Marshall Islands","222 Mauritania","230 Mauritius","52 Mexico","691 Micronesia","373 Moldova","377 Monaco","976 Mongolia","382 Montenegro","1-664 Montserrat","212 Morocco","258 Mozambique","95 Myanmar","264 Namibia","674 Nauro","977 Nepal","31 Netherlands","599 Netherlands Antilles","687 New Caledonia","64 New Zealand","505 Nicaragua","227 Niger","234 Nigeria","850 North Korea","47 Norway","968 Oman","92 Pakistan","680 Palau","970 Palestine","507 Panama","675 Papua New Guinea","595 Paraguay","51 Peru","63 Philippines","48 Poland","351 Portugal","1-787, 1-939 Puerto Rico","974 Qatar","262 Reunion","40 Romania","7 Russia","250 Rwanda","508 Saint Pierre & Miquelon","685 Samoa","378 San Marino","239 Sao Tome and Principe","966 Saudi Arabia","221 Senegal","381 Serbia","248 Seychelles","232 Sierra Leone","65 Singapore","421 Slovakia","386 Slovenia","677 Solomon Islands","252 Somalia","27 South Africa","82 South Korea","211 South Sudan","34 Spain","94 Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","249 Sudan","597 Suriname","268 Swaziland","46 Sweden","41 Switzerland","963 Syria","886 Taiwan","992 Tajikistan","255 Tanzania","66 Thailand","Timor L'Este","228 Togo","676Tonga","1-868 Trinidad & Tobago","216 Tunisia","90 Turkey","993 Turkmenistan","1-649 Turks & Caicos","688 Tuvalu","256 Uganda","380 Ukraine","971 United Arab Emirates","44 United Kingdom","1 United States of America","598 Uruguay","998 Uzbekistan","678 Vanuatu","379 Vatican City","58 Venezuela","84 Vietnam","Virgin Islands (US)","967 Yemen","260 Zambia","263 Zimbabwe"];
  
  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("myInput"), countrycode);