git pull
cp ~/wordleh/wordleh_engine.py /var/www/wordleh-flask
cp ~/wordleh/wordleh_app.py /var/www/wordleh-flask
cd ~/wordleh/wordleh-react
npm run build static
sudo cp -r build/* /var/www/html