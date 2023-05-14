// Get our game_container
let game_container = document.getElementById('game_container')

// Create a cursor
let cursor = 0

// Create a gameboard to illustrate tic tac toe board
let gameboard = new Array(9).fill(null)

// Create the two players
let players = ['🧠', '🫀']

// Create the scroe baord
let scoreboard = [0, 0]


// A function to reset the game
function reset_game(last_cursor) {

    // When we reset the game. Alternate the player who starts.
    cursor = (last_cursor == 0) ? 1 : 0

    // Reset the gameboard to nulls
    gameboard = new Array(9).fill(null)

    // Create the gameboard
    create_game()

}

// Check the game
function check_game() {

    // Define winning states
    let top_row = [ gameboard[0], gameboard[1], gameboard[2] ]
    let middle_row = [ gameboard[3], gameboard[4], gameboard[5] ]
    let bottom_row = [ gameboard[6], gameboard[7], gameboard[8] ]

    let left_column = [ gameboard[0], gameboard[3], gameboard[6] ]
    let middle_column = [ gameboard[1], gameboard[4], gameboard[7] ]
    let right_column = [ gameboard[2], gameboard[5], gameboard[8] ]

    let right_diagonal = [ gameboard[0], gameboard[4], gameboard[8] ]
    let left_diagonal = [ gameboard[2], gameboard[4], gameboard[6] ]

    // COmbine all the possible wins
    let all = [

        top_row,
        middle_row,
        bottom_row,

        left_column,
        middle_column,
        right_column,

        right_diagonal,
        left_diagonal

    ]

    // Define the winning cursor
    let winning_cursor = null

    // Define a flag for "game over"
    let is_game_over = null

    // A short function to determine if all values in an array are the same
    // Win returns [ cursor, has 3 in a row (is a winner)]
    let win = (array) => ( array[0] != null )
        ? [array[0], new Set(array).size == 1]
        : [array[0], false]

    // Check if the gameboard is full.
    // Check if any null values exist in the gameboard array
    let is_gameboard_full = !gameboard.includes(null)

    // Iterate through all our possible wins to find a win
    for (let i = 0; i < all.length; i++) {

        // Make updates before checking
        let is_a_win = win(all[i])
        // Define the winning cursor and is game over
        winning_cursor = is_a_win[0]
        is_game_over = is_a_win[1]

        // The moment we have a win. Stop checking.
        if (is_game_over == true) {

            break

        }

    }

    // Check if the board is full and we don't have a winner.
    if (is_gameboard_full == true && is_game_over == false) {

        // If gameboard is indeed full. Game is done.
        is_game_over = true
        // Set winning_cursor to null
        winning_cursor = null

    }

    // Return an array of the winning cursor and is game over
    return [winning_cursor, is_game_over]

}


// Create the game
function create_game() {

    // Set the last cursor to current cursor
    let last_cursor = cursor

    // Clear the game_container
    game_container.innerHTML = ''

    // For every tab on the gameboard (9)
    for (let i = 0; i < 9; i++) {

        // A function to update the tab cursor
        let udpate_tab_cursor = (tab_cursor, cursor) => tab_cursor.textContent = players[cursor]

        // Create tab
        let tab = document.createElement('div')
        tab.setAttribute('class', 'tab')
        tab.setAttribute('data-index', i)

        // Create the tab cursor
        let tab_cursor = document.createElement('h2')
        tab_cursor.setAttribute('class', 'tab_cursor')
        udpate_tab_cursor(tab_cursor, cursor)

        // When the tab is clicked
        tab.onclick = function() {

            // Check if this tab is already active
            if (this.getAttribute('data-active')) {

                // Don't bother doing anything else in the code.
                return

            }

            // Get the tab index when clicked on.
            let tab_index = this.getAttribute('data-index')

            // Get the tab cursor of this tab
            let tab_cursor = this.querySelector('.tab_cursor')

            // Update the gameboard
            gameboard[tab_index] = cursor

            // After updating the gameboard. Check game!
            let is_a_win = check_game()
            let winning_cursor = is_a_win[0]
            let is_game_over = is_a_win[1]

            // Check if is_game_over is true.
            if (is_game_over == true) {

                // End the game with style.
                // if (winning_cursor == null): We have a draw.
                let selected_player = (winning_cursor == null)
                ? `${players[0]} ${players[1]}`
                : players[winning_cursor]

                // Update the scoreboard of winning player
                scoreboard[winning_cursor] += (winning_cursor == null)
                ? 0
                : 1

                // Create a message. Either "draw" or "win"
                let message = (winning_cursor == null)
                ? 'draw'
                : 'win'

                // Alert a winner
                create_alert(selected_player, message, last_cursor)

            }

            // Add active to tab
            this.setAttribute('data-active', null)
            tab_cursor.classList.add('is_active')
            udpate_tab_cursor(tab_cursor, cursor)

            // Change the cursor. Other players turn.
            cursor = (cursor == 0) ? 1 : 0

            // Define tabs
            let tabs = document.getElementsByClassName('tab')

            // Update all the tab cursors on the gameboard
            for (let i = 0; i < tabs.length; i++) {

                // If this tab is not active
                if (!tabs[i].getAttribute('data-active')) {

                    // Update the tab cursor
                    let tab_cursor = tabs[i].querySelector('.tab_cursor')
                    udpate_tab_cursor(tab_cursor, cursor)

                }

            }

        }


        // Append tab cursor to tab
        tab.append(tab_cursor)

        // Append tab to game container
        game_container.append(tab)

    }

}

// Create alert
function create_alert(selected_player, message, last_cursor) {

    // Create the alert backdrop
    let alert_backdrop = document.createElement('div')
    alert_backdrop.setAttribute('id', 'alert_backdrop')

    let alert_container = document.createElement('div')
    alert_container.setAttribute('id', 'alert_container')

    let alert_message_container = document.createElement('div')
    alert_message_container.setAttribute('id', 'alert_message_container')

    let alert_player = document.createElement('h2')
    alert_player.setAttribute('id', 'alert_player')
    alert_player.textContent = selected_player

    let alert_message = document.createElement('h2')
    alert_message.setAttribute('id', 'alert_message')
    alert_message.textContent = message

    let alert_score = document.createElement('h2')
    alert_score.setAttribute('id', 'alert_score')
    alert_score.textContent = `${scoreboard[0]}-${scoreboard[1]}`

    // Append the 'messages' to the message container
    alert_message_container.append(alert_player, alert_message, alert_score)

    let alert_action_container = document.createElement('div')
    alert_action_container.setAttribute('id', 'alert_action_container')

    let alert_action = document.createElement('button')
    alert_action.setAttribute('id', 'alert_action')
    alert_action.textContent = 'Keep Playing! ▶️ '

    // Onclick for alert_action
    alert_action.onclick = function() {

        // Remove the alert window
        alert_backdrop.remove()
        alert_container.remove()    

        // Reset the game + Pass in the last_cursor
        reset_game(last_cursor)

    }

    // Append action to the action container
    alert_action_container.append(alert_action)

    alert_container.append(alert_message_container, alert_action_container)
    document.body.append(alert_container, alert_backdrop)

}


// Create the game
create_game()