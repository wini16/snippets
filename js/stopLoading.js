if (typeof window.stop === 'function') {
    window.stop();
} else {
    document.execCommand('Stop');
}