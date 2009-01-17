rm -rf src-pinkpaula-all/*
cp ../pinkpaula/release-latest/*  src-pinkpaula-all/
cd src-pinkpaula-all
unzip * 
cd ..
rm -rf src-pinkpaula-chromeonly/*
cd src-pinkpaula-chromeonly
mv ../src-pinkpaula-all/browser .
mv ../src-pinkpaula-all/communicator .
mv ../src-pinkpaula-all/mozapps .
mv ../src-pinkpaula-all/help .
mv ../src-pinkpaula-all/global .
zip -r classic.jar * 
