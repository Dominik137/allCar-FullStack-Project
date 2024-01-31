import React from "react";
import Nav from "./Nav";


function Dashboard({user}){
console.log(user.username)
console.log(user)
    return(
        <div>
            <div class="flex flex-row text-center">
                <div class="basis-1/3">01</div>
                <div class="basis-1/3 pt-8">
                    <h1>Welcome back {user.username}!</h1>
                </div>
                <div class="basis-1/3">03</div>
            </div>
            <div class="flex flex-row text-center">
                <div class="basis-1/3">01</div>
                <div class="basis-1/3 pt-32">
                    <h1 className="text-3xl">Your Cars</h1>
                </div>
                <div class="basis-1/3">03</div>
            </div>
            <div class="flex flex-row text-center">
                <div class="basis-1/3">01</div>
                <div class="basis-1/3 pt-32">
                    <h1 className="text-3xl">Maintence Reminders</h1>
                </div>
                <div class="basis-1/3">03</div>
            </div>
      </div>
    )
}

export default Dashboard