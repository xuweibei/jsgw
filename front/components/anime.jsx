import React from "react";
import anime from "animejs";

export default class AnimeDemo extends React.PureComponent {
    componentDidMount() {
        anime({
            targets: ".demo1",
            backgroundColor: [
                { value: "#5F9EA0", duration: 2700 },
                { value: "#3A5FCD", duration: 2300 }
            ],
            fontSize: [
                { value: "32px", duration: 2700 },
                { value: "64px", duration: 2300 }
            ],
            opacity: 0.2,
            rotate: 360,
            borderRadius: 8,
            duration: 5000,
            loop: false,
            easing: "easeInOutSine"
        });

        const logEl = document.querySelector(".demo2");
        const battery = {
            charged: "0%",
            cycles: 120
        };
        anime({
            targets: battery,
            charged: "100%",
            cycles: 130,
            round: 1,
            easing: "linear",
            update: function() {
                logEl.innerHTML = JSON.stringify(battery);
            }
        });

        anime({
            targets: ".demo3",
            translateX: 250,
            scale: 2,
            rotate: "1turn"
        });
    }

    render() {
        return (
            <>
                <div class="demo1">DEMO1</div>
                <div class="demo2"></div>
                <div
                    class="demo3"
                    style={{ height: 20, width: 20, backgroundColor: "red" }}
                ></div>
            </>
        );
    }
}
