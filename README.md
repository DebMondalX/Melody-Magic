# Melody-Magic
A web application to demonstrate various kinds of recommendation algorithms. 

There are various algorithms that recommend users items/products based on comparison between certain 
qualities among different items/products,while other algorithms compare between users and their likes 
or dislikes for certain items/products to generate recommendations. There are others that employ both of these features.

# Live Demo
https://melody-magic.vercel.app

Search for any song- click on the song name to listen.

Generate your own personalised playlist.

Choose from the most popular songs or any random song suggestion. 

# Website Preview
![page-one](https://user-images.githubusercontent.com/71892789/170827537-f0f7a451-4ae0-4c98-94c7-7b4ac24c41c9.jpg)
![page-two](https://user-images.githubusercontent.com/71892789/170827590-cf0dd531-dad2-461f-84d1-8ef3000ae6e2.jpg)
![page-three](https://user-images.githubusercontent.com/71892789/170827601-56ca85b7-0bea-412a-9054-7c9c13db2b2f.jpg)
![page-four](https://user-images.githubusercontent.com/71892789/170827607-3b341d31-e877-4b61-b2bd-c914f2d987cd.jpg)

## Table of Content
  -[Features](#features)

-[TechStack](#techstack)

-[Development](#development)
## Features
- **Most popular songs recommended- listen to what others are listening**
  - Most searched/clicked songs across all users suggested
- **Discover new songs**
  - Try out new recommendations
- **Search for a particular song**
  - Search for a song and play it on Spotify
  - Get suggestion to similar songs
- **Generate your own playlist**
  - Rate some songs and get a playlist generated
 
 ## TechStack
   - nodeJS
   - reactJS
   - postgreSQL
   - python
 
 ## Development
 ### Configuration, Setup and Running 
  
   The data-preparation folder contains the code to generate the songs data in the form of a csv file. A copy of the file is already present in the Server folder.
   
   1. Clone the repository.
   2. Create a new [Supabase project](https://supabase.com/)
   3. Open the Supabase project, go to table editor and create a new table named `song_recommendations`. Select "import data via spreadsheet" option, and upload Server/songID_precompute.csv . Set the `index` column as primary key.
   4. Go to SQL editor of the Supabase project and run the following queries:
   ```sql
   alter table song_recommendations add column searches_count int default 0;
  ```
  ```sql
   alter table song_recommendations alter column index type int using (index::int);
  ```
  ```sql
   alter table song_recommendations rename index to id;
  ```
    
 5. Run these queries in the SQL editor:
 ```sql   
  create or replace function increment_searches_count(song_id_input text) returns void as 
  $$
    update song_recommendations
    set searches_count = searches_count + 1
    where song_id = song_id_input
  $$
  language sql
```    

```sql   
create or replace function get_random_song_ids() returns table(
  song_id text
) as
$$
begin 
  return query SELECT s.song_id
  FROM (
    SELECT generate_series(1,5), (random()*4200):: int AS id
  ) r
  JOIN song_recommendations s
  ON s.id = r.id;
end;
$$
language plpgsql
 ```
 
 6. Create a `.env` file at frontend/rec-app/ and add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` to it (get the Supabase url and the anon key
    from the newly created project)
 7. Add `REACT_APP_SERVER_URL=http://localhost:8000/` to the same `.env` file.
 8. Run `npm install` in the terminal in frontend/rec-app/ directory.
 9. Create a new app from Spotify developers dashboard.
 10. Create a new `.env` file in Server/ and add the `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` taken from Spotify developers' dashboard of the app.
 11. Run `npm install` in the terminal in the Server/ directory.
 12. Run `npm start` the terminal in the Server/ directory.
 13. Run `npm start` in the terminal in frontend/rec-app/ directory.
  
