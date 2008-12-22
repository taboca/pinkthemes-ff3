
rm -f patch-tmp/*

./patch-include/filestrip.sh ./src/theme/svg/biblioteca/Toolbar/buttons-integrated.svg > ./patch-tmp/buttons-integrated.svg
cat ./patch-include/xmlprelude.txt ./patch-include/cssToolbar.txt  ./patch-tmp/buttons-integrated.svg > ./src/theme/svg/biblioteca/Toolbar/buttons-integrated.svg
       
# ./src/theme/svg/biblioteca/Global/icons/tab-complete.svg needs to import ../../base.css 
