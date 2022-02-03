git pull
cp ~/wordleh_engine.py /var/www/wordleh-flask
cp ~/wordleh_app.py /var/www/wordleh-flask
cd ~/wordleh-react
npm run build static
sudo cp -r build/* /var/www/html