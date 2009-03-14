
cp fixcss.sh replace.sh

./colorhigh.py 120 180 170 6
./colorlow.py 120 180 170 10

./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh fixcss-120-180-170.sh

cp base.css replace.sh
./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-120-180-170.css






