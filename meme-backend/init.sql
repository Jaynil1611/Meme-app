CREATE DATABASE memes;
\c memes
CREATE TABLE memeinfo
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text NOT NULL,
    url text  NOT NULL,
    caption text NOT NULL,
    CONSTRAINT memeinfo_pkey PRIMARY KEY (id)
);

-- INSERT INTO memeinfo (name,url,caption) VALUES ('Harry','https://images.indianexpress.com/2019/10/IRCTC-1200-2.jpg','IRCTC Meme');
-- INSERT INTO memeinfo (name,url,caption) VALUES ('Kevin','https://static.businessworld.in/article/article_extra_large_image/1530772981_sqeqcy_Funny-marketing-meme-concept-470.jpg','Marketing Meme');
-- INSERT INTO memeinfo (name,url,caption) VALUES ('Johnny','https://i.imgflip.com/1l6uou.jpg','OOPS Meme');
