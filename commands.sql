CREATE TABLE blogs(
	id SERIAL PRIMARY KEY,
	author TEXT	,
	url text NOT NULL,
	title TEXT NOT NULL,
	likes INTEGER DEFAULT 0
	);

INSERT INTO blogs(
		author,
		url,
		title
)
VALUES
('Kai Hall' , 'www.postgres.url','testing postgress from CLI'),
('Kai Hall' , 'www.postgres.url','learning multirow insert syntax')
; 