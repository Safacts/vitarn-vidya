# UNIT 2: Sequence, Flowchart, Control Flow & Data Manipulation - Detailed Notes

---

## 1. Sequence, Flowchart, and Control Flow

### Sequencing the Workflow

#### What is a Sequence?
A Sequence is the simplest and most linear type of workflow in UiPath. It executes activities one after another in a top-down manner, from first to last, without any branching or looping.

#### Characteristics of Sequence:
- **Linear Execution**: Activities run in order
- **No Branching**: Straight path through the workflow
- **Simple Structure**: Easy to understand and debug
- **Best For**: Simple processes with clear steps
- **No Decision Points**: No conditional logic

#### When to Use Sequence:
- Simple, linear processes
- Step-by-step procedures
- Processes without complex logic
- Quick automation tasks
- Learning and prototyping

#### Example Use Cases:
- Opening an application and performing a series of clicks
- Data entry with fixed steps
- Simple file operations
- Sequential report generation

### Activities

#### What are Activities?
Activities are the building blocks of UiPath workflows. Each activity performs a specific action or operation. Activities can be dragged from the Activities panel and dropped onto the workflow designer.

#### Types of Activities:

**1. UI Automation Activities**:
- **Click**: Clicks on a UI element
- **Type Into**: Enters text into a field
- **Get Text**: Extracts text from an element
- **Hover**: Moves mouse over an element
- **Select Item**: Selects from dropdowns
- **Check/Uncheck**: Toggles checkboxes

**2. Control Flow Activities**:
- **If**: Conditional branching
- **For Each**: Iterates through collections
- **While**: Loop while condition is true
- **Do While**: Loop with post-condition
- **Switch**: Multiple condition branching
- **Try Catch**: Exception handling
- **Throw**: Raises an exception

**3. Data Activities**:
- **Assign**: Sets variable values
- **Build Data Table**: Creates data tables
- **Add Data Row**: Adds rows to data table
- **Filter Data Table**: Filters data table rows
- **Sort Data Table**: Sorts data table

**4. Excel Activities**:
- **Excel Application Scope**: Opens Excel file
- **Read Cell**: Reads cell value
- **Write Cell**: Writes to cell
- **Read Range**: Reads cell range
- **Write Range**: Writes to cell range

**5. Mail Activities**:
- **Send SMTP Mail**: Sends email via SMTP
- **Send Outlook Mail**: Sends via Outlook
- **Get Outlook Mail**: Retrieves emails
- **Save Mail**: Saves email attachments

**6. File Activities**:
- **Create File**: Creates new file
- **Delete File**: Deletes file
- **Copy File**: Copies file
- **Move File**: Moves file
- **Read Text File**: Reads file content
- **Write Text File**: Writes to file

**7. System Activities**:
- **Kill Process**: Terminates process
- **Start Process**: Launches application
- **Log Message**: Logs to output
- **Comment**: Adds comments to workflow

### Control Flow

#### What is Control Flow?
Control flow determines the order in which activities are executed in a workflow. It enables decision-making, looping, and branching based on conditions.

#### Control Flow Activities in Detail:

**1. If Activity**
- **Purpose**: Executes different branches based on a condition
- **Structure**: Condition (True branch, False branch)
- **Usage**: Decision making in workflows

**Syntax**:
```
If condition Then
    [Activities when condition is true]
Else
    [Activities when condition is false]
End If
```

**Example**:
```
If orderAmount > 1000 Then
    ApplyDiscount(0.10)
Else
    ApplyDiscount(0.05)
End If
```

**2. For Each Activity**
- **Purpose**: Iterates through each item in a collection
- **Types**: For Each, For Each Row (for data tables)
- **Usage**: Processing lists, arrays, data tables

**Example**:
```
For Each item In itemList
    ProcessItem(item)
End For Each
```

**3. While Activity**
- **Purpose**: Repeats activities while condition is true
- **Type**: Pre-condition loop (checks before executing)
- **Usage**: Unknown number of iterations
- **Caution**: Risk of infinite loops

**Example**:
```
While fileExists = True
    ProcessFile()
    CheckFileExists()
End While
```

**4. Do While Activity**
- **Purpose**: Repeats activities until condition becomes false
- **Type**: Post-condition loop (checks after executing)
- **Usage**: Execute at least once, then check condition
- **Difference**: Always executes at least once

**Example**:
```
Do
    AttemptLogin()
    CheckLoginStatus()
Loop Until loginSuccessful = True
```

**5. Switch Activity**
- **Purpose**: Multiple condition branching
- **Structure**: Expression with multiple case values
- **Usage**: Multiple possible values for same variable
- **Default Case**: Fallback when no case matches

**Example**:
```
Switch department
    Case "Sales":
        ProcessSalesOrder()
    Case "Marketing":
        ProcessMarketingRequest()
    Case "HR":
        ProcessHRRequest()
    Default:
        ProcessGenericRequest()
End Switch
```

**6. Flow Decision**
- **Purpose**: Visual decision node in Flowcharts
- **Structure**: Condition with True/False paths
- **Usage**: Complex branching in flowcharts
- **Alternative**: If activity in sequences

**7. Flow Switch**
- **Purpose**: Visual switch node in Flowcharts
- **Structure**: Expression with multiple case connections
- **Usage**: Multiple branches in flowcharts
- **Visual**: More intuitive than Switch activity

### Various Types of Loops and Decision Making

#### Loops:

**1. For Loop**:
- Iterates a specific number of times
- Counter-based iteration
- Known number of iterations
- Example: Process 10 files

**2. For Each Loop**:
- Iterates through collection items
- No counter needed
- Collection-based iteration
- Example: Process all rows in Excel

**3. While Loop**:
- Continues while condition is true
- Unknown iterations
- Pre-condition check
- Example: Wait for file to appear

**4. Do While Loop**:
- Executes at least once
- Continues until condition is false
- Post-condition check
- Example: Retry operation until success

#### Decision Making:

**1. Simple If**:
- Single condition check
- True/False branches
- Basic decision making

**2. Nested If**:
- If inside another If
- Multiple conditions
- Complex logic

**3. Else If**:
- Multiple conditions sequentially
- First true condition executes
- Alternative to nested If

**4. Switch Case**:
- Multiple value checks
- Cleaner than multiple If
- Single variable evaluation

**5. Ternary Operator**:
- Inline conditional
- Simple assignments
- Not directly in UiPath, use If

#### Best Practices for Control Flow:
- Use appropriate loop type for the scenario
- Avoid infinite loops with proper exit conditions
- Keep nesting levels manageable (max 3-4)
- Use meaningful variable names
- Add comments for complex logic
- Test edge cases (empty collections, null values)

---

## 2. Data Manipulation

### Variables and Scope

#### What are Variables?
Variables are named storage locations that hold data values during workflow execution. They allow you to store, retrieve, and manipulate data throughout your automation.

#### Variable Declaration:
- **Name**: Unique identifier (camelCase recommended)
- **Type**: Data type (String, Int32, Boolean, etc.)
- **Scope**: Accessibility within workflow
- **Default**: Initial value (optional)
- **Direction**: Input/Output (for arguments)

#### Data Types in UiPath:

**1. Primitive Types**:
- **String**: Text data ("Hello World")
- **Int32**: Whole numbers (42)
- **Int64**: Large whole numbers (9000000000)
- **Double**: Decimal numbers (3.14)
- **Boolean**: True/False values
- **DateTime**: Date and time values
- **Char**: Single character ('A')

**2. Complex Types**:
- **Array**: Fixed-size collection of same type
- **List**: Dynamic collection (System.Collections.Generic.List)
- **Dictionary**: Key-value pairs
- **DataTable**: Table with rows and columns
- **Queue**: First-in-first-out collection
- **Stack**: Last-in-first-out collection

**3. Special Types**:
- **Object**: Generic type (can hold any type)
- **Variable**: Holds another variable
- **Argument**: Pass data between workflows

#### Variable Scope:

**1. Global Scope**:
- Accessible throughout entire project
- Defined in project settings
- Rarely used in UiPath

**2. Workflow Scope**:
- Accessible within the workflow
- Default scope for variables
- Most commonly used

**3. Container Scope**:
- Accessible within container (If, For Each, etc.)
- Limited to specific block
- Good for temporary variables

**4. Argument Scope**:
- Used to pass data between workflows
- Input, Output, or Input/Output
- Defined in workflow properties

#### Scope Hierarchy:
```
Global (widest)
    ↓
Workflow
    ↓
Container (If, For Each, Try Catch)
    ↓
Local (narrowest)
```

#### Variable Naming Conventions:
- Use camelCase (e.g., customerName)
- Descriptive names (e.g., invoiceTotal not x)
- No spaces or special characters
- Cannot start with number
- Avoid reserved keywords

#### Creating Variables:
1. Open Variables panel (Ctrl+K)
2. Click "Create Variable"
3. Enter name
4. Select data type
5. Set default value (optional)
6. Choose scope

### Collections

#### What are Collections?
Collections are data structures that store multiple items of the same or different types. They enable efficient data management and manipulation.

#### Types of Collections:

**1. Arrays**:
- Fixed-size collection
- Same type elements
- Zero-based indexing
- Fast access by index

**Declaration**:
```
String[] employeeNames = {"John", "Jane", "Bob"}
Int32[] scores = New Int32() {85, 90, 78}
```

**Operations**:
- Access: employeeNames(0) → "John"
- Length: employeeNames.Length → 3
- Iterate: For Each item In array

**Limitations**:
- Fixed size (cannot resize)
- Cannot add/remove elements easily

**2. Lists (System.Collections.Generic.List)**:
- Dynamic size
- Same type elements
- Zero-based indexing
- Rich methods for manipulation

**Declaration**:
```
List<String> productList = New List(Of String)()
List<Int32> quantities = New List(Of Int32)()
```

**Common Methods**:
- **Add(item)**: Adds element to end
- **Remove(item)**: Removes first occurrence
- **RemoveAt(index)**: Removes at specific index
- **Insert(index, item)**: Inserts at position
- **Contains(item)**: Checks if item exists
- **Count**: Returns number of elements
- **Clear()**: Removes all elements
- **ToArray()**: Converts to array

**Example**:
```
List<String> names = New List(Of String)()
names.Add("Alice")
names.Add("Bob")
names.Add("Charlie")
names.RemoveAt(1)  ' Removes Bob
If names.Contains("Alice") Then
    LogMessage("Alice is in the list")
End If
```

**3. Dictionaries**:
- Key-value pairs
- Unique keys
- Fast lookup by key
- Unordered collection

**Declaration**:
```
Dictionary<String, Int32> ages = New Dictionary(Of String, Int32)()
Dictionary<String, String> config = New Dictionary(Of String, String)()
```

**Common Methods**:
- **Add(key, value)**: Adds key-value pair
- **Remove(key)**: Removes by key
- **ContainsKey(key)**: Checks if key exists
- **ContainsValue(value)**: Checks if value exists
- **Item(key)**: Gets/sets value by key
- **Count**: Returns number of pairs
- **Keys**: Returns collection of keys
- **Values**: Returns collection of values

**Example**:
```
Dictionary<String, Int32> employeeAges = New Dictionary(Of String, Int32)()
employeeAges.Add("John", 30)
employeeAges.Add("Jane", 28)
employeeAges.Add("Bob", 35)

If employeeAges.ContainsKey("John") Then
    LogMessage("John's age: " + employeeAges("John").ToString())
End If
```

**4. Queues**:
- First-In-First-Out (FIFO)
- Enqueue (add to back)
- Dequeue (remove from front)
- Used for task scheduling

**Declaration**:
```
Queue<String> taskQueue = New Queue(Of String)()
```

**Common Methods**:
- **Enqueue(item)**: Adds to back
- **Dequeue()**: Removes and returns front
- **Peek()**: Returns front without removing
- **Count**: Returns number of elements
- **Clear()**: Removes all elements

**Example**:
```
Queue<String> printJobs = New Queue(Of String)()
printJobs.Enqueue("Document1.pdf")
printJobs.Enqueue("Document2.pdf")
Dim currentJob As String = printJobs.Dequeue()
```

**5. Stacks**:
- Last-In-First-Out (LIFO)
- Push (add to top)
- Pop (remove from top)
- Used for undo operations

**Declaration**:
```
Stack<String> historyStack = New Stack(Of String)()
```

**Common Methods**:
- **Push(item)**: Adds to top
- **Pop()**: Removes and returns top
- **Peek()**: Returns top without removing
- **Count**: Returns number of elements
- **Clear()**: Removes all elements

**Example**:
```
Stack<String> navigationHistory = New Stack(Of String)()
navigationHistory.Push("Page1")
navigationHistory.Push("Page2")
Dim previousPage As String = navigationHistory.Pop()
```

### Arguments – Purpose and Use

#### What are Arguments?
Arguments are similar to variables but are specifically used to pass data between different workflows (invoked workflows). They define the input and output parameters of a workflow.

#### Argument Directions:

**1. In**:
- Data enters the workflow
- Read-only within the workflow
- Cannot be modified
- Used for input parameters

**2. Out**:
- Data exits the workflow
- Must be assigned before workflow ends
- Used for return values
- Caller receives the value

**3. In/Out**:
- Data enters and can be modified
- Modified value returned to caller
- Used for bidirectional data flow
- Acts as reference parameter

**4. Property**:
- Similar to In/Out
- Used with Invoke Workflow File
- Less commonly used

#### Creating Arguments:
1. Open workflow properties
2. Go to Arguments section
3. Click "Create Argument"
4. Enter name
5. Select direction
6. Choose data type
7. Set default value (optional)

#### Example Usage:

**Invoked Workflow (Calculate.xaml)**:
```
Arguments:
- In: number1 (Int32)
- In: number2 (Int32)
- In: operation (String)
- Out: result (Double)

Workflow:
If operation = "add" Then
    result = number1 + number2
Else If operation = "subtract" Then
    result = number1 - number2
Else If operation = "multiply" Then
    result = number1 * number2
Else If operation = "divide" Then
    result = number1 / number2
End If
```

**Main Workflow (Main.xaml)**:
```
Invoke Workflow File: Calculate.xaml
Arguments:
- number1: 10
- number2: 5
- operation: "add"
- result: calculationResult (variable)

LogMessage("Result: " + calculationResult.ToString())
```

#### Best Practices for Arguments:
- Use descriptive names
- Choose appropriate direction
- Set default values for optional parameters
- Document argument purposes
- Use arguments instead of global variables
- Keep argument lists manageable

### Data Table Usage with Examples

#### What is a DataTable?
A DataTable is an in-memory representation of a table with rows and columns, similar to an Excel spreadsheet. It's a powerful data structure for handling structured data.

#### DataTable Structure:
- **Columns**: Define the schema (name, data type)
- **Rows**: Contain the actual data
- **Cells**: Intersection of row and column

#### Creating Data Tables:

**1. Empty DataTable**:
```
Dim employeeTable As DataTable = New DataTable()
employeeTable.Columns.Add("ID", GetType(Int32))
employeeTable.Columns.Add("Name", GetType(String))
employeeTable.Columns.Add("Department", GetType(String))
employeeTable.Columns.Add("Salary", GetType(Double))
```

**2. Using Build Data Table Activity**:
- Drag "Build Data Table" to canvas
- Define columns in Data Table property
- Set default values if needed
- Output to variable

**3. From Excel Range**:
```
Excel Application Scope
    Read Range (output: dataTable)
```

#### Adding Data to DataTable:

**1. Add Data Row Activity**:
```
Add Data Row: {1, "John", "IT", 50000} to employeeTable
Add Data Row: {2, "Jane", "HR", 45000} to employeeTable
Add Data Row: {3, "Bob", "Finance", 55000} to employeeTable
```

**2. Programmatically**:
```
Dim newRow As DataRow = employeeTable.NewRow()
newRow("ID") = 4
newRow("Name") = "Alice"
newRow("Department") = "Marketing"
newRow("Salary") = 48000
employeeTable.Rows.Add(newRow)
```

#### Accessing Data from DataTable:

**1. Access Specific Cell**:
```
Dim name As String = employeeTable.Rows(0)("Name").ToString()
Dim salary As Double = Convert.ToDouble(employeeTable.Rows(1)("Salary"))
```

**2. Iterate Through Rows**:
```
For Each row As DataRow In employeeTable.Rows
    LogMessage("Employee: " + row("Name").ToString() + 
               ", Dept: " + row("Department").ToString())
Next
```

**3. Iterate Through Columns**:
```
For Each column As DataColumn In employeeTable.Columns
    LogMessage("Column: " + column.ColumnName)
Next
```

#### DataTable Operations:

**1. Filter Data Table**:
```
Dim filteredTable As DataTable = 
    employeeTable.Select("Department = 'IT'").CopyToDataTable()
```

**2. Sort Data Table**:
```
Dim sortedView As DataView = New DataView(employeeTable)
sortedView.Sort = "Salary DESC"
Dim sortedTable As DataTable = sortedView.ToTable()
```

**3. Group and Aggregate**:
```
Dim groupedRows As DataRow() = employeeTable.Select("Department = 'IT'")
Dim totalSalary As Double = 0
For Each row As DataRow In groupedRows
    totalSalary += Convert.ToDouble(row("Salary"))
Next
```

**4. Join Data Tables**:
```
Dim joinedTable As DataTable = New DataTable()
joinedTable.Merge(employeeTable)
joinedTable.Merge(departmentTable)
```

#### Common DataTable Activities:

**1. Build Data Table**:
- Creates new DataTable structure
- Defines columns and types
- Optional default data

**2. Add Data Row**:
- Adds single row to DataTable
- Array of values
- Can add multiple rows

**3. Filter Data Table**:
- Filters rows based on condition
- Outputs filtered DataTable
- Supports SQL-like syntax

**4. Sort Data Table**:
- Sorts rows by column(s)
- Ascending or descending
- Multiple column sorting

**5. Output Data Table**:
- Writes DataTable to file
- CSV format
- Custom delimiters

**6. Clear Data Table**:
- Removes all rows
- Keeps column structure
- Useful for resetting

#### Example: Processing Employee Data

```
' Create DataTable
Dim employeeData As DataTable = New DataTable()
employeeData.Columns.Add("EmployeeID", GetType(Int32))
employeeData.Columns.Add("Name", GetType(String))
employeeData.Columns.Add("HoursWorked", GetType(Double))
employeeData.Columns.Add("HourlyRate", GetType(Double))

' Add sample data
employeeData.Rows.Add({101, "John Smith", 40, 25.50})
employeeData.Rows.Add({102, "Jane Doe", 35, 30.00})
employeeData.Rows.Add({103, "Bob Johnson", 45, 22.75})

' Calculate payroll
For Each row As DataRow In employeeData.Rows
    Dim hours As Double = Convert.ToDouble(row("HoursWorked"))
    Dim rate As Double = Convert.ToDouble(row("HourlyRate"))
    Dim overtime As Double = 0
    Dim regularPay As Double = 0
    Dim overtimePay As Double = 0
    
    If hours > 40 Then
        overtime = hours - 40
        regularPay = 40 * rate
        overtimePay = overtime * rate * 1.5
    Else
        regularPay = hours * rate
    End If
    
    Dim totalPay As Double = regularPay + overtimePay
    row("TotalPay") = totalPay
    row("OvertimeHours") = overtime
Next

' Filter high earners
Dim highEarners As DataRow() = employeeData.Select("TotalPay > 1000")

' Sort by total pay
Dim sortedView As DataView = New DataView(employeeData)
sortedView.Sort = "TotalPay DESC"
```

### File Operation with Step-by-Step Example

#### Common File Operations:

**1. Check if File Exists**:
```
If File.Exists("C:\Data\input.txt") Then
    LogMessage("File exists")
Else
    LogMessage("File does not exist")
End If
```

**2. Create New File**:
```
File.Create("C:\Data\newfile.txt").Dispose()
' or
Write Text File: "C:\Data\newfile.txt" with content "Hello World"
```

**3. Read Text File**:
```
Dim fileContent As String = File.ReadAllText("C:\Data\input.txt")
' or
Read Text File: "C:\Data\input.txt" → contentVariable
```

**4. Write to File**:
```
File.WriteAllText("C:\Data\output.txt", "This is the content")
' or
Write Text File: "C:\Data\output.txt" with content "This is the content"
```

**5. Append to File**:
```
File.AppendAllText("C:\Data\log.txt", "New log entry" + Environment.NewLine)
' or
Append Line: "C:\Data\log.txt" with content "New log entry"
```

**6. Delete File**:
```
File.Delete("C:\Data\oldfile.txt")
' or
Delete: "C:\Data\oldfile.txt"
```

**7. Copy File**:
```
File.Copy("C:\Data\source.txt", "C:\Backup\source.txt", True)
' or
Copy File: "C:\Data\source.txt" to "C:\Backup\source.txt" (overwrite: True)
```

**8. Move File**:
```
File.Move("C:\Data\temp.txt", "C:\Archive\temp.txt")
' or
Move File: "C:\Data\temp.txt" to "C:\Archive\temp.txt"
```

#### Step-by-Step Example: Processing Text Files

**Scenario**: Read multiple text files from a folder, process each file, and save results to output folder.

**Step 1: Define Variables**
```
inputFolder: String = "C:\Input"
outputFolder: String = "C:\Output"
fileList: String[]
fileContent: String
processedContent: String
fileName: String
```

**Step 2: Create Output Folder if Not Exists**
```
If Not Directory.Exists(outputFolder) Then
    Directory.CreateDirectory(outputFolder)
End If
```

**Step 3: Get List of Files**
```
fileList = Directory.GetFiles(inputFolder, "*.txt")
```

**Step 4: Process Each File**
```
For Each filePath As String In fileList
    ' Extract filename
    fileName = Path.GetFileName(filePath)
    
    ' Read file content
    fileContent = File.ReadAllText(filePath)
    
    ' Process content (example: convert to uppercase)
    processedContent = fileContent.ToUpper()
    
    ' Add timestamp
    processedContent = processedContent + Environment.NewLine + 
                       "Processed on: " + DateTime.Now.ToString()
    
    ' Write to output
    File.WriteAllText(Path.Combine(outputFolder, fileName), processedContent)
    
    LogMessage("Processed: " + fileName)
Next
```

**Step 5: Log Summary**
```
LogMessage("Total files processed: " + fileList.Length.ToString())
```

#### File System Activities in UiPath:

**1. Path Exists**:
- Checks if file/folder exists
- Returns Boolean
- Useful for validation

**2. Create File**:
- Creates new empty file
- Overwrites if exists
- Creates directories if needed

**3. Delete File/Folder**:
- Removes file or folder
- Can use wildcard
- Recursive for folders

**4. Copy File/Folder**:
- Copies to new location
- Can overwrite existing
- Preserves attributes

**5. Move File/Folder**:
- Moves to new location
- Can overwrite existing
- Changes location

**6. Read Text File**:
- Reads entire file content
- Outputs as String
- Encoding options

**7. Write Text File**:
- Writes content to file
- Creates if not exists
- Overwrites by default

**8. Append Line**:
- Adds line to end of file
- Creates if not exists
- Useful for logging

### CSV/Excel to Data Table and Vice Versa

#### CSV to Data Table:

**Method 1: Using Read CSV Activity**
```
Read CSV: "C:\Data\employees.csv"
    Output: employeeDataTable
    IncludeColumnNames: True
    Delimiter: Comma
```

**Method 2: Using Generate Data Table Activity**
```
Dim csvContent As String = File.ReadAllText("C:\Data\employees.csv")
Generate Data Table from: csvContent
    Output: employeeDataTable
    ColumnSeparator: Comma
```

**Method 3: Manual Parsing**
```
Dim csvLines As String() = File.ReadAllLines("C:\Data\employees.csv")
Dim dataTable As DataTable = New DataTable()

' Create columns from header
Dim headers As String() = csvLines(0).Split(","c)
For Each header As String In headers
    dataTable.Columns.Add(header.Trim())
Next

' Add data rows
For i As Integer = 1 To csvLines.Length - 1
    Dim values As String() = csvLines(i).Split(","c)
    dataTable.Rows.Add(values)
Next
```

#### Data Table to CSV:

**Method 1: Using Output Data Table Activity**
```
Output Data Table: employeeDataTable
    To: "C:\Data\output.csv"
    IncludeColumnNames: True
    Delimiter: Comma
```

**Method 2: Manual Construction**
```
Dim csvContent As StringBuilder = New StringBuilder()

' Add header
Dim headers As String() = dataTable.Columns.Cast(Of DataColumn)() _
                          .Select(Function(c) c.ColumnName).ToArray()
csvContent.AppendLine(String.Join(",", headers))

' Add rows
For Each row As DataRow In dataTable.Rows
    Dim values As String() = row.ItemArray.Select(Function(o) o.ToString()).ToArray()
    csvContent.AppendLine(String.Join(",", values))
Next

File.WriteAllText("C:\Data\output.csv", csvContent.ToString())
```

#### Excel to Data Table:

**Method 1: Using Read Range Activity**
```
Excel Application Scope: "C:\Data\employees.xlsx"
    Workbook: employeesWorkbook
    Read Range: "A1:D100"
        Output: employeeDataTable
        AddHeaders: True
```

**Method 2: Read Entire Sheet**
```
Excel Application Scope: "C:\Data\employees.xlsx"
    Read Range: "Sheet1"
        Output: employeeDataTable
        AddHeaders: True
```

#### Data Table to Excel:

**Method 1: Using Write Range Activity**
```
Excel Application Scope: "C:\Data\output.xlsx"
    Create if not exists
    Write Range: employeeDataTable
        Starting cell: "A1"
        AddHeaders: True
```

**Method 2: Append to Existing Excel**
```
Excel Application Scope: "C:\Data\output.xlsx"
    Write Range: employeeDataTable
        Starting cell: "A" + (lastRow + 1).ToString()
        AddHeaders: False
```

#### Example: Complete CSV Processing Workflow

**Scenario**: Read CSV file, filter data, calculate totals, and save to new CSV.

```
' Step 1: Read CSV
Read CSV: "C:\Input\sales.csv"
    Output: salesDataTable
    IncludeColumnNames: True

' Step 2: Filter high-value sales
Dim highValueRows As DataRow() = salesDataTable.Select("Amount > 1000")
Dim highValueTable As DataTable = highValueRows.CopyToDataTable()

' Step 3: Add calculated column
highValueTable.Columns.Add("Tax", GetType(Double))
highValueTable.Columns.Add("Total", GetType(Double))

For Each row As DataRow In highValueTable.Rows
    Dim amount As Double = Convert.ToDouble(row("Amount"))
    Dim tax As Double = amount * 0.1
    Dim total As Double = amount + tax
    
    row("Tax") = tax
    row("Total") = total
Next

' Step 4: Sort by total amount
Dim sortedView As DataView = New DataView(highValueTable)
sortedView.Sort = "Total DESC"
Dim sortedTable As DataTable = sortedView.ToTable()

' Step 5: Write to new CSV
Output Data Table: sortedTable
    To: "C:\Output\high_value_sales.csv"
    IncludeColumnNames: True
    Delimiter: Comma

' Step 6: Log summary
LogMessage("Processed " + sortedTable.Rows.Count.ToString() + " high-value sales")
```

#### Best Practices for File and Data Operations:
- Always check if files/directories exist before operations
- Use Try-Catch for file operations (handle permissions, locks)
- Close file handles properly
- Use appropriate encoding (UTF-8 recommended)
- Handle large files in chunks
- Validate data before processing
- Log operations for debugging
- Backup important files before modification

---

## Key Exam Points for Unit 2:

### Short Questions:
1. What is the difference between Sequence and Flowchart?
2. Explain the types of loops in UiPath
3. What are the different data types in UiPath?
4. Differentiate between Array and List
5. What is the purpose of arguments in UiPath?
6. Explain the difference between In, Out, and In/Out arguments
7. What is a DataTable and its structure?
8. How do you read a CSV file into a DataTable?

### Long Questions:
1. Explain various control flow activities in UiPath with examples
2. Describe different types of collections in UiPath with their use cases
3. Explain variable scope in UiPath with examples
4. Discuss DataTable operations in detail with examples
5. Explain file operations in UiPath with a step-by-step example
6. Describe how to convert CSV/Excel to DataTable and vice versa

### Practical Aspects:
- Creating and using variables with different scopes
- Implementing loops and decision-making logic
- Working with collections (List, Dictionary, etc.)
- Creating and manipulating Data Tables
- Reading and writing CSV/Excel files
- Using arguments to pass data between workflows
