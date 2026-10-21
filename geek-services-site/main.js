const query = new URLSearchParams(location.search);
const form = document.querySelector('#contact-form');
if (form) {
  for (const name of ['location', 'interest']) {
    const field = form.elements.namedItem(name);
    const value = query.get(name);
    if (value && [...field.options].some(option => option.value === value)) field.value = value;
  }
  // Store only a path, never a query string that could contain personal information.
  const referrer = document.referrer ? new URL(document.referrer) : null;
  if (referrer?.origin === location.origin) form.elements.namedItem('source').value = referrer.pathname;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    const button = form.querySelector('button');
    button.disabled = true;
    status.textContent = 'Sending your inquiry…';
    try {
      const response = await fetch('/contact/', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!response.ok) throw new Error('Submission failed');
      location.assign('/thank-you/');
    } catch {
      status.textContent = 'Your inquiry could not be sent. Your details are still here. Please try again, or email leonardo@geekservicesny.com.';
      button.disabled = false;
    }
  });
}
document.querySelectorAll('[data-consultation]').forEach(link => {
  link.addEventListener('click', () => {
    const body = JSON.stringify({ path: location.pathname });
    // The navigation remains usable if tracking is blocked or unavailable.
    fetch('/api/consultation-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  });
});
const latitude = document.querySelector('#latitude');
const tilt = document.querySelector('#tilt');
if (latitude && tilt) {
  const alignment = (lat, angle) => Math.max(0, Math.cos((lat - angle) * Math.PI / 180));
  const draw = () => {
    const lat = Number(latitude.value), angle = Number(tilt.value);
    const value = (alignment(lat, angle) * 100).toFixed(1);
    document.querySelector('#latitude-value').value = lat;
    document.querySelector('#tilt-value').value = angle;
    document.querySelector('#alignment').textContent = `${value}%`;
    const points = Array.from({ length: 91 }, (_, index) => `${index ? 'L' : 'M'}${50 + index / 90 * 480},${220 - alignment(lat, index) * 200}`).join(' ');
    document.querySelector('#alignment-curve').setAttribute('d', points);
    const point = document.querySelector('#alignment-point');
    point.setAttribute('cx', 50 + angle / 90 * 480);
    point.setAttribute('cy', 220 - alignment(lat, angle) * 200);
    document.querySelector('#plot-desc').textContent = `At latitude ${lat} degrees north, the equinox solar-noon alignment peaks at tilt ${lat} degrees. The selected tilt ${angle} gives ${value} percent alignment. This is geometry, not an annual energy forecast.`;
    document.querySelector('#model-status').textContent = `Latitude ${lat}° N · tilt ${angle}° · ${value}% relative alignment. This is not a forecast of energy production.`;
  };
  latitude.addEventListener('input', draw);
  tilt.addEventListener('input', draw);
  draw();
}
