#!/usr/bin/env node
const { mkdirSync, existsSync } = require("fs");

const folders = [
    'http/api/controllers', 'http/api/routes',
    'http/frontend/pages',
    'socket/chat',
    'console/controllers', 'console/routes',
    'shared/database/models', 'shared/database/migrations', 'shared/database/services',
    'shared/events',
    'shared/services',
    'app/bootstrap',
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

