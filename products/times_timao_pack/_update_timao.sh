rm -rf src-timao-all/*
cp ../times_timao/release-latest/*  src-timao-all/
cd src-timao-all
unzip * 
cd ..
rm -rf src-timao-chromeonly/*
cd src-timao-chromeonly
mv ../src-timao-all/browser .
mv ../src-timao-all/communicator .
mv ../src-timao-all/mozapps .
mv ../src-timao-all/help .
mv ../src-timao-all/global .
zip -r classic.jar * 
