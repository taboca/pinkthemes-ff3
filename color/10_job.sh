

cp fixcss.sh replace.sh

./colorhigh.py $1 $2 $3 $4 
./colorlow.py $1 $2 $3 $5 

./sedcolorhigh.sh 
./sedcolorlow.sh 


mkdir base-$1-$2-$3

cp replace.sh base-$1-$2-$3/fixcss.sh

cp base.css replace.sh
./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-$1-$2-$3/base.css






