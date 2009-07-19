
echo "++++++ Added patch ./patches/cat-global.css to global.css ( buttons stuff )  ... " 
cat ./build-chrome-classic/chrome/classic/skin/classic/global/global.css ./patches-products/alpha/cat-global.css > ./temp/temp.css  
cp ./temp/temp.css ./build-chrome-classic/chrome/classic/skin/classic/global/global.css


