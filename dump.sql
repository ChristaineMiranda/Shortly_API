--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: sessions_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions_users (
    id integer NOT NULL,
    id_session integer NOT NULL,
    id_user integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_users_id_seq OWNED BY public.sessions_users.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    short_url text NOT NULL,
    visit_count integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    email character varying(80) NOT NULL,
    password text NOT NULL,
    visit_total integer DEFAULT 0 NOT NULL,
    link_total integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_urls (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_url integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_urls_id_seq OWNED BY public.users_urls.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: sessions_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions_users ALTER COLUMN id SET DEFAULT nextval('public.sessions_users_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_urls ALTER COLUMN id SET DEFAULT nextval('public.users_urls_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '59450fe5-44ad-4b1f-acca-845a0bc3aeb7', '2023-02-28 10:45:55.151038');
INSERT INTO public.sessions VALUES (2, 'c84f49d2-0672-4a07-90fc-2b3a3e12bd3c', '2023-02-28 10:55:58.180528');
INSERT INTO public.sessions VALUES (3, 'd2fd0f77-d8cb-4fe6-8d2b-2a3077a5518c', '2023-02-28 11:20:13.343515');


--
-- Data for Name: sessions_users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions_users VALUES (1, 1, 1, '2023-02-28 10:45:55.152866');
INSERT INTO public.sessions_users VALUES (2, 2, 2, '2023-02-28 10:55:58.189166');
INSERT INTO public.sessions_users VALUES (3, 3, 3, '2023-02-28 11:20:13.348204');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 'esse é um link muito longo', 'GRr7RLsmJc1QWBF90CVaE', 0, '2023-03-02 13:55:39.562069');
INSERT INTO public.urls VALUES (2, 'segundo link deste usuario', 'nWrO5npKb4eNB87LgiCMK', 0, '2023-03-02 13:55:59.978677');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Christaine', 'christaine@email.com', '$2b$10$dqJs0FfY8QnNYclj1dZPAu0SDYThlM/DN2DRDswc.z6W6mPoY1wSO', 0, 0, '2023-02-28 10:45:05.571935');
INSERT INTO public.users VALUES (2, 'Larissa', 'larissa@email.com', '$2b$10$78YmTTW08ByVHM.vJwOLe.8Jc0e2VPKHWP/fOfI7bO/eZLnpnd5mW', 0, 0, '2023-02-28 10:55:43.322218');
INSERT INTO public.users VALUES (3, 'Julya', 'julya@email.com', '$2b$10$e7LgTiCEHYCSrwrK0NEQCuJYj5TPfAqxpXVf19h/361UKhuB7Hwwu', 0, 0, '2023-02-28 11:19:55.431875');


--
-- Data for Name: users_urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users_urls VALUES (1, 3, 1, '2023-03-02 13:55:39.56725');
INSERT INTO public.users_urls VALUES (2, 3, 2, '2023-03-02 13:55:59.980311');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: sessions_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_users_id_seq', 3, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: users_urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_urls_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: sessions_users sessions_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions_users
    ADD CONSTRAINT sessions_users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_short_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_urls users_urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_urls
    ADD CONSTRAINT users_urls_pkey PRIMARY KEY (id);


--
-- Name: sessions_users sessions_users_id_session_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions_users
    ADD CONSTRAINT sessions_users_id_session_fkey FOREIGN KEY (id_session) REFERENCES public.sessions(id);


--
-- Name: sessions_users sessions_users_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions_users
    ADD CONSTRAINT sessions_users_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users_urls users_urls_id_url_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_urls
    ADD CONSTRAINT users_urls_id_url_fkey FOREIGN KEY (id_url) REFERENCES public.urls(id);


--
-- Name: users_urls users_urls_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_urls
    ADD CONSTRAINT users_urls_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

