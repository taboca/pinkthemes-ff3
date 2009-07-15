
cp fixcss.sh replace.sh

./colorhigh.py 180 210 140 6
./colorlow.py 180 210 140 10

./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh fixcss-180-210-140.sh

cp base.css replace.sh
./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-180-210-240.css






