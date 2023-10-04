#!/usr/bin/bash


declare -a urls=(
	":3000/api/v1/aabcccddd"
	":3000/api/v1/status"
	":3000/api/v1/feed"
	":3000/api/v1/users"
	":3000/api/v1/user/1"
	":3000/api/v1/users/1/drafts"
	":3000/api/v1/post/1"
	":3000/api/v1/post/1/view"
)

for url in ${urls[@]}; do
	echo "# hTTPie 'http -f $url'"
	http -f $url
done
