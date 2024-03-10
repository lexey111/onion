import {useEffect} from "react"

function subscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.addEventListener(eventName, listener)
}

function unsubscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.removeEventListener(eventName, listener)
}

function publish(eventName: string, data?: unknown) {
	const event = new CustomEvent(eventName, {detail: data})
	document.dispatchEvent(event)
}

function useSubscribe(signal: string, processFn: (data?: unknown) => unknown) {
	useEffect(() => {
		subscribe(signal, processFn)

		return () => {
			unsubscribe(signal, processFn)
		}
	}, [signal, processFn])
}

export {publish, subscribe, unsubscribe, useSubscribe};
