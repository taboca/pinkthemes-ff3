
cp fixcss.sh replace.sh

./colorhigh.py 240 170 250 3
./colorlow.py 240 170 250 10

./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh fixcss-240-170-250.sh

cp base.css replace.sh
./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-240-170-250.css






