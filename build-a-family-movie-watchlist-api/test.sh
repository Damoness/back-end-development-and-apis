curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username":"dad_miller",
  "password":"parent456"
}'


# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkYWRfbWlsbGVyIiwicGFzc3dvcmQiOiJwYXJlbnQ0NTYiLCJyb2xlIjoicGFyZW50IiwiaWF0IjoxNzkxODczMDgwLCJleHAiOjE3OTE4NzY2ODB9.9TKEM91SBpeQFE7RYUfCtC5x2gWNMdCukswpbfhSNGA


curl http://localhost:3000/api/watchlist/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkYWRfbWlsbGVyIiwicGFzc3dvcmQiOiJwYXJlbnQ0NTYiLCJyb2xlIjoicGFyZW50IiwiaWF0IjoxNzkxODczMDgwLCJleHAiOjE3OTE4NzY2ODB9.9TKEM91SBpeQFE7RYUfCtC5x2gWNMdCukswpbfhSNGA" \
-H "Content-Type: application/json" 


curl http://localhost:3000/api/watchlist/1/movies \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkYWRfbWlsbGVyIiwicGFzc3dvcmQiOiJwYXJlbnQ0NTYiLCJyb2xlIjoicGFyZW50IiwiaWF0IjoxNzkxODczMDgwLCJleHAiOjE3OTE4NzY2ODB9.9TKEM91SBpeQFE7RYUfCtC5x2gWNMdCukswpbfhSNGA" \
-H "Content-Type: application/json" \
-d '{
  "title":"test",
  "genre":"Drama"
}'