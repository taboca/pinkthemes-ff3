
rm -f patch-tmp/*

./patch-include/filestrip.sh ./src/theme/svg/biblioteca/Toolbar/buttons-integrated.svg > ./patch-tmp/buttons-integrated.svg
cat ./patch-include/xmlprelude.txt "<?xml-stylesheet href=\"../base.css\" type=\"text/css\"?>" ./patch-tmp/buttons-integrated.svg > ./src/theme/svg/biblioteca/Toolbar/buttons-integrated.svg
