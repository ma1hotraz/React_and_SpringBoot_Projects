export default function greet(time) {

    const hour = parseInt(time.split(':')[0]);

    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon!";
    } else if (hour >= 18 && hour < 24) {
        greeting = "Good evening!";
    } else {
        greeting = "Hello!";
    }

    return greeting;
}
