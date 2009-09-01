
echo "++++++ Added patch ./patches/cat-global.css to global.css ( buttons stuff )  ... " 
cat ./build-chrome-classic/chrome/classic/skin/classic/global/global.css ./patches-products/gray/cat-button.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/button.css

cat ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css ./patches-products/gray/cat-menu.css > ./temp/temp.css
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/menu.css


