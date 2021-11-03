export interface Quote {
	p: number; // price as float
	pd: string; // price formatted for display
	c: string; // price change
	cp: string; // price change percentage
	cl: string; // previous close
	o: string; // day's open
	h: string; // day's high
	l: string; // day's low
	v: string; // day's volume
	u: string; // last updated timestamp (market hours)
	td: string; // trading date
	h52: string; // 52-week high
	l52: string; // 52-week low
	ex: string; // exchange
	ms: string; // market status (open/closed)
	e: boolean; // extended hours (true or false)
	ep: number; // extended hours price as float
	epd: string; // extended hours price formatted for display
	ec: string; // extended hours price change
	ecp: string; // extended hours price change percentage
	eu: string; // extended hours last updated timestamp
	es: string; // extended hours market status (Pre-market/After-hours)
}
