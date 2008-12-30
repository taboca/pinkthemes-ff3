
sed -e "s/#808080/rgb(225,205,220)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css

sed -e "s/#8F8F8F/rgb(210,150,190)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css

sed -e "s/#5F5F5F/rgb(210,150,190)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/findBar.css



sed -e "s/#dedede/rgb(252,187,242)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/popup.css



echo "statusbar top border fixing ... "

sed -e "s/#505050/rgb(210,150,190)/g" ./build-chrome-classic/chrome/classic/skin/classic/global/global.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css
