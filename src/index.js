#!/usr/bin/env node
const { mkdirSync, existsSync } = require("fs");

const folders = [
    'http/api/controllers', 'http/api/routes',
    'http/frontend/controllers', 'http/frontend/routes',
    'http/backend/controllers', 'http/frontend/routes',
    'socket/chat',
    'console/controllers', 'console/routes',
    'database/models', 'database/migrations', 'database/services',
    'events/services',
    'app/services',
]

function log(text)
{
    process.stdout.write(text);
}

// Create all folders
log("1. Create all folders");
folders.forEach(f => {
    log(`-> create ${f} folder ... `);
    if (!existsSync(f)) 
    {
        mkdirSync(f, { recursive: true })
        log(" done!\n")
    }
    else
    {
        log(" already exists!\n")
    }
    
})

