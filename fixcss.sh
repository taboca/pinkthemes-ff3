
echo "============================================="
echo "Table - 255,230,255 - high up "
echo "Table - 255,210,250 - high up "
echo "Table - 250,190,240 - high "
echo "Table - 225,170,215 - high 10% "
echo "Table - 200,150,195 - high 20% "
echo "Table - 125,90,120  - medium "
echo "Table - 100,70,95   - dark "


echo "========== Error console border for the toolbar elements ============"


sed -e "s/#686868/rgb(225,170,215)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

sed -e "s/#404040/rgb(225,170,215)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css


echo "=========== pageInfo border fix ==============="

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/pageInfo.css

echo "-------------- console same thing ---------------"

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/console/console.css

echo "-------------- extensions same thing ---------------"

sed -e "s/#404040/rgb(100,70,95)/g" ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/mozapps/extensions/extensions.css


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


echo "========== status top high ============" 
echo "statusbar top border fixing ... "


sed -e "s/#505050/rgb(210,150,190)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/global.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css


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


