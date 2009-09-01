rm -rf ./src-abouttimao-all/*
cp ../abouttimao/release-latest/* ./src-abouttimao-all/
cd src-abouttimao-all
unzip * 

rm install.rdf
rm chrome.manifest
rm *.xpi

