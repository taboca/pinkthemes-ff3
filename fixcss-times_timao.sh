
echo "++++++ Added patch ./patches/cat-global.css to global.css ( buttons stuff )  ... " 
cat ./build-chrome-classic/chrome/classic/skin/classic/global/global.css ./patches-products/times_timao/cat-button.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

cat ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css ./patches-products/times_timao/cat-menu.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css


echo "Pathching +++ cat-browser-tabsregressionn - compatible with marcio tabs XBL "

cat ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css ./patches-products/times_timao/cat-browser-tabsregression.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/browser/browser.css

