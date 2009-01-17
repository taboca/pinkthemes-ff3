rm -rf ./src-aboutpink-all/*
cp ../aboutpink/release-latest/* ./src-aboutpink-all/
cd src-aboutpink-all
unzip * 

rm install.rdf
rm chrome.manifest
rm *.xpi

