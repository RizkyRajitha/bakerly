for ((i=1;i<=100;i++))
do
curl --request POST --url http://localhost:3001/auth/loginwemail --header 'Content-Type: application/json' --data '{"email":"tylor@swift.com",	"password":"123"}'
done