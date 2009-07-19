

cp fixcss.sh replace.sh

./sedcolorhigh.sh 
./sedcolorlow.sh 

mkdir base-alpha

cp replace.sh base-alpha/fixcss.sh

cp base.css replace.sh

./sedcolorhigh.sh 
./sedcolorlow.sh 

cp replace.sh base-alpha/base.css






