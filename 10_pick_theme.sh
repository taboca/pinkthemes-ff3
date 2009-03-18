
cp -r ./src/theme/svg/src ./build-svg
cp -r ./src/theme/svg/biblioteca ./build-svg

cp -r ./src/theme/svg/src-$1/* ./build-svg/src/

cp color/$1/fixcss.sh .
cp color/$1/base.css ./build-svg/biblioteca/
