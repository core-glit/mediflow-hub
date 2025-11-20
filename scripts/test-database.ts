import { supabase } from '../src/integrations/supabase/client';

/**
 * Database Verification Script
 * Tests all 17 tables in the Hospital Management System
 */

interface TestResult {
    table: string;
    accessible: boolean;
    canRead: boolean;
    canInsert: boolean;
    error?: string;
}

const TABLES = [
    'profiles',
    'patients',
    'medical_records',
    'vitals',
    'appointments',
    'consultations',
    'billing',
    'lab_requests',
    'pharmacy_inventory',
    'prescriptions',
    'pharmacy_sales',
    'wards',
    'beds',
    'admissions',
    'maternity_records',
    'optical_records',
    'dental_records',
];

async function testTableAccess(tableName: string): Promise<TestResult> {
    const result: TestResult = {
        table: tableName,
        accessible: false,
        canRead: false,
        canInsert: false,
    };

    try {
        // Test READ access
        const { data, error: readError } = await supabase
            .from(tableName)
            .select('*')
            .limit(1);

        if (readError) {
            result.error = `Read Error: ${readError.message}`;
            return result;
        }

        result.accessible = true;
        result.canRead = true;

        console.log(`✅ ${tableName}: READ access OK`);
        return result;
    } catch (error: any) {
        result.error = error.message;
        console.error(`❌ ${tableName}: ${error.message}`);
        return result;
    }
}

async function testConnection() {
    console.log('🔍 Testing Supabase Connection...\n');

    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error('❌ Connection Error:', error.message);
            return false;
        }

        console.log('✅ Supabase connection successful');
        console.log(`📊 Auth Status: ${data.session ? 'Authenticated' : 'Not authenticated'}\n`);
        return true;
    } catch (error: any) {
        console.error('❌ Connection failed:', error.message);
        return false;
    }
}

async function runTests() {
    console.log('═══════════════════════════════════════════════════');
    console.log('   DATABASE VERIFICATION TEST');
    console.log('   Hospital Management System');
    console.log('═══════════════════════════════════════════════════\n');

    // Test connection first
    const connected = await testConnection();
    if (!connected) {
        console.log('\n❌ Cannot proceed without connection. Please check your .env file.');
        return;
    }

    console.log('Testing table accessibility...\n');

    const results: TestResult[] = [];

    for (const table of TABLES) {
        const result = await testTableAccess(table);
        results.push(result);
    }

    // Summary
    console.log('\n═══════════════════════════════════════════════════');
    console.log('   TEST SUMMARY');
    console.log('═══════════════════════════════════════════════════\n');

    const accessible = results.filter(r => r.accessible).length;
    const canRead = results.filter(r => r.canRead).length;

    console.log(`Total Tables: ${TABLES.length}`);
    console.log(`Accessible: ${accessible}/${TABLES.length}`);
    console.log(`Read Access: ${canRead}/${TABLES.length}`);

    console.log('\n📋 Detailed Results:\n');

    results.forEach(result => {
        const status = result.accessible ? '✅' : '❌';
        console.log(`${status} ${result.table.padEnd(25)} - ${result.accessible ? 'OK' : result.error}`);
    });

    console.log('\n═══════════════════════════════════════════════════\n');

    if (accessible === TABLES.length) {
        console.log('🎉 All tables are accessible!');
    } else {
        console.log('⚠️  Some tables are not accessible. Check RLS policies and authentication.');
    }
}

// Run the tests
runTests().catch(console.error);
