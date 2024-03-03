import { GoalDetail } from "../interface/EmailOption.interface";

export const professionalTemplate = (details: GoalDetail[]) => {
    let goalsList = '';
    details.forEach(detail => {
        goalsList += `<p>${detail.description}: ${detail.targetAmount}</p>`;
    });
    // Coding in this feels like coding in jsx's dad.
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Your Daily Dose of Motivation: Keep Chasing Your Dreams!</title>
        <style>
            body {
                background-color: #f5f5f5;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 500px;
                margin: 50px auto;
                padding: 30px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 24px;
                color: #333;
                margin-bottom: 15px;
                text-align: center; /* Center align headings */
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                color: #666;
                margin-bottom: 10px;
            }
            .highlight {
                font-weight: bold;
                color: #2980b9; /* Blue */
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                margin-left: 20px; /* Indent list for better structure */
            }
            li {
                margin-bottom: 5px;
                padding-left: 15px; /* Additional padding for list items */
                border-left: 2px solid #2980b9; /* Add a blue border to list items */
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Fuel Your Passion: Remember Why You Started</h1>
            <p class="highlight">Feeling discouraged? It happens to the best of us.</p>
            <p>But remember, your goals are worth reaching. Take a deep breath and recommit to the journey. You've got this!</p>
            <p>Here are some reminders to keep you inspired:</p>
            <ul>
                <li>Visualize your success. What does achieving your goals look and feel like?</li>
                <li>Focus on progress, not perfection. Celebrate every step forward, no matter how small.</li>
                <li>Embrace challenges as opportunities to learn and grow.</li>
                <li>Surround yourself with positive and supportive people who believe in you.</li>
            </ul>
            <p>Remember, every day is a chance to move closer to your dreams. Don't give up, keep pushing forward, and watch your potential unfold!</p>
            <h2>Today's Goal: </h2>
            ${goalsList}
            <p class="footer">This email was sent from YourCompanyName. If you have any questions, please contact us at support@example.com</p>
        </div>
    </body>
    </html>
    `;
};


export const badAssTemplate =
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Title</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            color: #333;
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        .highlight {
            color: #007bff;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Are you giving up on your goals? Fine you are helpless. Even my App could not fix you</h1>
        <p class="highlight">Fine, you feel helpless. But remember...</p>
        <p style="color: #007bff;">You know what just keep your lazy ass in the couch. Don't even bother to get up from it. Yeah, keep watching Tictoc videos, and that will help you reduce body fat. </p>
        <p>Here are some quick tips to get you back on track:</p>
        <ul>
            <li>Every time you could not complete what you committed. Slap really hard on your face for 10 times.</li>
            <li>Stop watching porns and start talking to girls </li>
        </ul>
        <p>Remember, every journey has its ups and downs. But yours looks like deep dive so far.</p>
        <p class="footer">This email was sent from YourCompanyName. If you have any questions, please contact us at support@example.com</p>
    </div>
</body>
</html>
`