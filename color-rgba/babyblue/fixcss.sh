
echo "Update b4..."

echo "============================================="
echo "Table - 255,230,255 - high up "
echo "Table - 255,210,250 - high up "
echo "Table - 250,190,240 - high "
echo "Table - 225,170,215 - high 10% "
echo "Table - 200,150,195 - high 20% "
echo "Table - 125,90,120  - medium "
echo "Table - 100,70,95   - dark "


echo "******************** Searchbar ******************************************"
cat ./build-chrome-classic/chrome/classic/skin/classic/browser/searchbar.css ./patches/cat-searchbar.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/searchbar.css


echo "******************** March 14th - global/tabbox.css ******************************************"
cat ./build-chrome-classic/chrome/classic/skin/classic/global/tabbox.css ./patches/cat-tabbox.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/tabbox.css

echo "******************** March 14 - browser/preferences/preferences.css ******************************************"
cat ./build-chrome-classic/chrome/classic/skin/classic/browser/preferences/preferences.css ./patches/cat-preferences.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/preferences/preferences.css

echo "******************** Feb 17th - global/menu.css ******************************************"
cat ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css ./patches/cat-menu.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css

echo "******************** Feb 17th - global/progressmeter.css *********************************"


echo "+++ Patch cat-progressmeter.css "

cat ./build-chrome-classic/chrome/classic/skin/classic/global/progressmeter.css ./patches/cat-progressmeter.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/progressmeter.css


echo "******************** Feb 17th - mozapps/downloads/downloads.css **************************"

echo "+++ Patch cat-downloads.css ... "

cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css ./patches/cat-downloads.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

echo "Download panel border fixes .. "

sed -e "s/#404040/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

echo "!!! Replacing cecece - required from the cat-downloads.css "

sed -e "s/#cecece/rgb(240,246,252)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

sed -e "s/#cfcfcf/rgb(210,228,246)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

echo "******************** Initiatind patches to Global  CSS *********************** "


echo "++++++ Added patch ./patches/cat-global2.css to global.css ... " 

echo "+++++ Added patch for statubar "
echo "+++++ Added patch for 50,50,50 -> 210,150,190 "

cat ./build-chrome-classic/chrome/classic/skin/classic/global/global.css ./patches/cat-global2.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css
echo "Expect marcio "
cat   ./build-chrome-classic/chrome/classic/skin/classic/global/global.css | grep "marcio"


echo "++++++ Added patch ./patches/cat-global.css to global.css ( buttons stuff )  ... " 
cat ./build-chrome-classic/chrome/classic/skin/classic/global/global.css ./patches/cat-global.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css

echo "Expect marcio in the global: "
cat   ./build-chrome-classic/chrome/classic/skin/classic/global/global.css | grep "marcio"



echo "******************** Patches to toolbar.css ****************************"

echo "++++++ Added patch ./patches/cat-toolbar.css to toolbar.css ... " 
cat ./build-chrome-classic/chrome/classic/skin/classic/global/toolbar.css ./patches/cat-toolbar.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/toolbar.css

echo "Expect marcio "
cat   ./build-chrome-classic/chrome/classic/skin/classic/global/toolbar.css | grep "marcio"


echo "***************************** viewbuttons . css *************************** 3.1b3" 

echo "++++ Patched cat-viewbuttons.css "

cat ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css ./patches/cat-viewbuttons.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css

echo "Found: "
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "#FFF"
sed -e "s/#FFF/rgb(0,0,0)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css
echo "Expect rgb 0,0,0"
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "rgb(0,0,0)"

echo "********************* Feb 17 console work ************************ "

echo "Doing regexp on console.css - we might consider moving this to the new cat-patch model "

echo "Found: 686868? " 
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css  | grep "#686868"

sed -e "s/#686868/rgb(108,126,144)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

echo "Changed to: "
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css  | grep "rgb(225"

echo " !!!! todo console "

sed -e "s/#404040/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

echo "=========== pageInfo border fix ==============="

sed -e "s/#404040/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css


echo "******************* Extensions.css under mozapps extensions **************************"


echo "Patching the top toolbar background which will also dump a 404040 code to be posfixed... "

cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css ./patches/cat-extensions.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css

echo "Checking for 404040:" 
cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css | grep "404040" 

echo "Now replacing 404040 with color: "

sed -e "s/#404040/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css

echo "color changed to: "

cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css | grep "100,70,95" 


echo "************************** Feb 17th Browser.css *****************************"


echo "Cropping the whole INACTIVE WINDOW section "
echo "Expect: INACTIVE WINDOW"
cat ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css  | grep "INACTIVE"
sed -e "s/INACTIVE\ WINDOW\ ----- \*\//\ overlay comment marcio /g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css
sed -e "s/.* SEARCH//g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css


echo "Pathching +++ cat-browser "

cat ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css ./patches/cat-browser.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css


echo "Pathching +++ cat-browser-tabsregressionn - compatible with marcio tabs XBL "

cat ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css ./patches/cat-browser-tabsregression.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css


echo "Copying the xml definition to the browser directory ... "

cp ./patches/marcio*.xml ./build-chrome-classic/chrome/classic/skin/classic/browser/ 


echo "!!! Color settings .... " 

sed -e "s/#666666/rgb(195,219,243)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#d4dde5/rgb(180,210,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#333333/rgb(144,168,192)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#b3b3b3/rgb(180,210,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#666/rgb(195,219,243)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

echo "!!! Bookmarks Dropdown menu popup ...."


sed -e "s/#ffffff/black/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#464646/rgb(195,219,243)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/0,0,0/0,0,0/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/26,26,26/26,26,26/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/128,128,128/128,128,128/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/53,53,53/53,53,53/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/162,162,162/162,162,162/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css


echo "************************ Feb 17th - global popup.css ******************************"

cat ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css ./patches/cat-popup.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css


echo "!!! doing dedede changes on top of cat-popup.css... "
sed -e "s/#dedede/rgb(180,210,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css







echo "*************** Feb 17th, buttons.css ***********************************"

echo "Catch the new rules "

cat ./build-chrome-classic/chrome/classic/skin/classic/global/button.css ./patches/cat-button.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css


echo "Color changes... "


sed -e "s/#eeeeee/rgb(180,210,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#dadada/rgba(255,255,255,.7)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#dedede/rgba(255,255,255,.9)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bababa/rgba(130,130,130,.5)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bebebe/rgba(130,130,130,.7)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css


echo "--------------------------------------------------"
echo "               Review                             "
echo "--------------------------------------------------"



echo "======== dark border topbar for the places ========"

sed -e "s/#404040/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "----------- background semi light for the places left tree --------------"

sed -e "s/#d2d8e2/rgb(144,168,192)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "-------------- in the selected element in the tree for the places,the #fff to black -----"

sed -e "s/#ffffff/black/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "======== medium ========"   

sed -e "s/#808080/rgb(72,84,96)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css

echo "======== medium ========"   

sed -e "s/#8F8F8F/rgb(108,126,144)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css


echo "======== dark ========"   

sed -e "s/#5F5F5F/rgb(36,42,48)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css


echo "=========== high top ========="

echo "******************************* Final manual something? *****************************"
echo "You may need to remove the XBL bindings in the beginning of the global.css file ... "   



sed -e "s/rgb(250,190,240)/rgb(180,210,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/global.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css


