const mysql = require('mysql2');

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const folderPath = 'Folder';
const groupId = 21;
const _userID = 6;
const _name = 'GRW';

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'EGplesk420123*',
    database: 'wasender'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});


async function readTextFiles() {
    try {
        const files = await fs.promises.readdir(folderPath);

        for (const file of files) {
            if (file.endsWith('.txt')) {
                const filePath = path.join(folderPath, file);
                const data = await fs.promises.readFile(filePath, 'utf8');

                const phoneNumbers = data.split(/\D+/);

                for (let index = 0; index < phoneNumbers.length; index++) {
                    let phoneNumber = phoneNumbers[index].replace(/\D/g, '');

                    // Ensure the phone number starts with "03"
                    if (phoneNumber.startsWith('03')) {
                        // Change the prefix to "92"
                        phoneNumber = '92' + phoneNumber.slice(1);
                    }

                    // Ensure the phone number is 12 digits
                    if (phoneNumber.length === 12) {
                        // Check if the phone number already exists in the database
                        const checkIfExistsQuery = 'SELECT id FROM contacts WHERE phone = ? AND user_id = ?';

                        connection.query(checkIfExistsQuery, [phoneNumber, _userID], (checkError, checkResults) => {
                            if (checkError) {
                                console.error(`Error checking if phone number ${phoneNumber} exists:`, checkError);
                            } else {
                                if (checkResults.length === 0) {
                                    // Insert the phone number into the contacts table
                                    const insertContactQuery = 'INSERT INTO contacts (user_id, name, phone, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';

                                    connection.query(insertContactQuery, [_userID, _name, phoneNumber], (insertError, insertResults) => {
                                        if (insertError) {
                                            console.error(`Error inserting phone number ${phoneNumber}:`, insertError);
                                        } else {
                                            const contactId = insertResults.insertId;
                                            // Insert an entry into the groupcontacts table
                                            const insertGroupContactQuery = 'INSERT INTO groupcontacts (group_id, contact_id) VALUES (?, ?)';

                                            connection.query(insertGroupContactQuery, [groupId, contactId], (groupError, groupResults) => {
                                                if (groupError) {
                                                    console.error(`Error inserting entry into groupcontacts table for contact ID ${contactId}:`, groupError);
                                                } else {
                                                    console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} added`);
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} Phone number ${phoneNumber} already exists.`);
                                }
                            }
                        });
                    } else {
                        console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} Invalid phone number length. Skipping insertion for ${phoneNumber}`);
                    }

                    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay between queries if needed
                }

                console.log(`End reading file ${file}:`);
            }
        }

        console.log(`End reading Folder`);
    } catch (err) {
        console.error('Error reading folder:', err);
    }
}


function readTextFiles2() {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach((file) => {
            if (file.endsWith('.txt')) {
                const filePath = path.join(folderPath, file);
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${file}:`, err);
                    }
                    else {

                        const phoneNumbers = data.split(/\D+/);

                        // Insert each phone number into the database
                        phoneNumbers.forEach((phoneNumber, index) => {
                            phoneNumber = phoneNumber.replace(/\D/g, '');
                            // Ensure the phone number starts with "03"
                            if (phoneNumber.startsWith('03')) {
                                // Change the prefix to "92"
                                phoneNumber = '92' + phoneNumber.slice(1);
                            }

                            // Ensure the phone number is 12 digits
                            if (phoneNumber.length === 12) {
                                // Check if the phone number already exists in the database
                                const checkIfExistsQuery = 'SELECT id FROM contacts WHERE phone = ? AND user_id = ?';

                                connection.query(checkIfExistsQuery, [phoneNumber, _userID], (checkError, checkResults) => {
                                    if (checkError) {
                                        console.error(`Error checking if phone number ${phoneNumber} exists:`, checkError);
                                    } else {
                                        if (checkResults.length === 0) {
                                            // Insert the phone number into the contacts table
                                            const insertContactQuery = 'INSERT INTO contacts (user_id, name, phone, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';

                                            connection.query(insertContactQuery, [_userID, 'LHR', phoneNumber], (insertError, insertResults) => {
                                                if (insertError) {
                                                    console.error(`Error inserting phone number ${phoneNumber}:`, insertError);
                                                } else {
                                                    const contactId = insertResults.insertId;
                                                    // Insert an entry into the groupcontacts table
                                                    const insertGroupContactQuery = 'INSERT INTO groupcontacts (group_id, contact_id) VALUES (?, ?)';

                                                    connection.query(insertGroupContactQuery, [groupId, contactId], (groupError, groupResults) => {
                                                        if (groupError) {
                                                            console.error(`Error inserting entry into groupcontacts table for contact ID ${contactId}:`, groupError);
                                                        } else {
                                                            console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} added`);
                                                        }
                                                    });
                                                }
                                            });
                                        } else {
                                            console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} Phone number ${phoneNumber} already exists.`);
                                        }
                                    }
                                });
                            } else {
                                console.log(`File : ${file} =>  ${index} / ${phoneNumbers.length} Invalid phone number length. Skipping insertion for ${phoneNumber}`);
                            }
                        });

                    }


                    console.log(`End reading file ${file}:`);
                });

            }
        });
        console.log(`End reading Folder`);
    });
}


readTextFiles();


function readCsvFiles() {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        files.forEach((file) => {
            if (file.endsWith('.csv')) {
                const filePath = path.join(folderPath, file);
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        console.log(`CSV Data from ${file}:\n`, row);
                    })
                    .on('end', () => {
                        console.log(`Finished reading ${file}`);
                    });
            }
        });
    });
}