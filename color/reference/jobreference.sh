
cp fixcss.sh replace.sh

./colorhigh.py 250 190 240 5
./colorlow.py 250 190 240 10

./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh fixcss-250-190-240.sh

cp base.css replace.sh
./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-250-190-240.css






