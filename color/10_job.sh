

cp fixcss.sh replace.sh

./_colorhigh.py $1 $2 $3 $4 
./_colorlow.py $1 $2 $3 $5 

./_sedcolorhigh.sh 
./_sedcolorlow.sh 


mkdir base-$1-$2-$3

cp replace.sh base-$1-$2-$3/fixcss.sh

cp base.css replace.sh
./_sedcolorhigh.sh 
./_sedcolorlow.sh 

cp replace.sh base-$1-$2-$3/base.css






