until $(curl --output /dev/null --silent --head --fail http://localhost:3000); do
    printf '.'
    sleep 3
done
