
echo "New model just  regexp rules on top of 3.1b3 ... and aims to find compatibility with 3.0 "

echo "============================================="
echo "Table - 255,230,255 - high up "
echo "Table - 255,210,250 - high up "
echo "Table - 250,190,240 - high "
echo "Table - 225,170,215 - high 10% "
echo "Table - 200,150,195 - high 20% "
echo "Table - 125,90,120  - medium "
echo "Table - 100,70,95   - dark "


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

echo "Found: "
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "#FFF"
sed -e "s/#FFF/rgb(0,0,0)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "rgb(0,0,0)"



echo "------ Removing line -moz-appearance: -moz-mac-unified-toolbar .. from viewbuttons.css "

cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "-moz-appearance: -moz-mac-unified-toolbar;" 
sed -e "s/-moz-mac-unified-toolbar/none/g" ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css > ./temp/temp.css
echo "Expect: moz appearance: none" 
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/viewbuttons.css | grep "-moz-appearance: none;" 




echo "========== Error console border for the toolbar elements ============"


echo "Found: 686868? " 
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css  | grep "#686868"

sed -e "s/#686868/rgb(225,170,215)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

echo "Changed to: "
cat  ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css  | grep "rgb(225"







echo "=========== pageInfo border fix ==============="

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css

echo "-------------- console same thing ---------------"

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

echo "******************* Extensions.css under mozapps extensions **************************"


echo "Patching the top toolbar background which will also dump a 404040 code to be posfixed... "

cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css ./patches/cat-extensions.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css

echo "Checking for 404040:" 
cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css | grep "404040" 

echo "Now replacing 404040 with color: "

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css

echo "color changed to: "

cat ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css | grep "100,70,95" 


echo "============ Browser.css the nav-bar background color ================ 3.1b3"

sed -e "s/#9e9e9e/transparent/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

echo "=========== Browser Bbookmarks edit fields background ==============="


sed -e "s/#666666/rgb(253,195,245)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#333333/rgb(150,120,140)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#b3b3b3/rgb(250,190,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#666/rgb(253,195,245)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

echo "=========  Bookmarks Dropdown menu popup ==============="


sed -e "s/#ffffff/black/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/#464646/125,90,120/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/0,0,0/35,10,35/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/26,26,26/75,30,65/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/128,128,128/200,150,195/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/53,53,53/125,90,120/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

sed -e "s/162,162,162/200,150,195/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

echo "======== dark border topbar for the places ========"

sed -e "s/#404040/rgb(125,90,120)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "----------- background semi light for the places left tree --------------"

sed -e "s/#d2d8e2/rgb(225,170,215)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "-------------- in the selected element in the tree for the places,the #fff to black -----"

sed -e "s/#ffffff/black/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/places/organizer.css

echo "======== medium ========"   

sed -e "s/#808080/rgb(125,90,120)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css

echo "======== medium ========"   

sed -e "s/#8F8F8F/rgb(125,90,120)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css


echo "======== dark ========"   

sed -e "s/#5F5F5F/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css


echo "=========== high top ========="

sed -e "s/#dedede/rgb(250,190,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css



echo "--------------------------------------------------"
echo "Download panel border .. "

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

echo "=========== odd tree row download =============="

sed -e "s/#cecece/rgb(255,205,246)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/downloads/downloads.css

echo "=========== button color background =============="

sed -e "s/#eeeeee/rgb(250,190,240)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#dadada/rgba(255,255,255,.7)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#dedede/rgba(255,255,255,.9)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bababa/rgba(130,130,130,.5)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bebebe/rgba(130,130,130,.7)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css



echo "******************************* Final manual something? *****************************"
echo "You may need to remove the XBL bindings in the beginning of the global.css file ... "   

