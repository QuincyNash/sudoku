import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo-512x512.png"></link>
				<link rel="shortcut icon" type="image/png" href="/favicon.png" />
				<meta name="theme-color" content="#19B344" />
				<link rel="preconnect" href="https://fonts.googleapis.com"></link>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
					rel="stylesheet"
				></link>
			</Head>
			<body>
				<Main></Main>
				<NextScript></NextScript>
			</body>
		</Html>
	);
}
