
echo "============================================="
echo "Table - 255,230,255 - high up "
echo "Table - 255,210,250 - high up "
echo "Table - 250,190,240 - high "
echo "Table - 225,170,215 - high 10% "
echo "Table - 200,150,195 - high 20% "
echo "Table - 125,90,120  - medium "
echo "Table - 100,70,95   - dark "

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

sed -e "s/#dadada/rgb(255,220,247)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#dedede/rgb(255,230,255)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bababa/rgb(200,150,195)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

sed -e "s/#bebebe/rgb(125,90,120)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/button.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css


