import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo-512x512.png"></link>
				<link rel="shortcut icon" type="image/png" href="/favicon.png" />
				<meta name="theme-color" content="#19B344" />
			</Head>
			<body>
				<Main></Main>
				<NextScript></NextScript>
			</body>
		</Html>
	);
}
