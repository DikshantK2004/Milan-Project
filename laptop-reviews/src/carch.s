.data
.dword 0x00000000FCD18613
.text
lui x4,0x10000
ld x6 , 0(x4)
andi x5,x6,0b01111111
add x10,x0,x0

L0:
    addi x21,x0,0b0110011
    addi x10,x0,1
    bne x5,x21,L1
    beq x0,x0,EXIT
L1:
    addi x21,x0,0b0010011
    addi x10,x0,2
    bne x5,x21,L2
    beq x0,x0,EXIT
L2:
    addi x21,x0,0b0000011 
    addi x10,x0,2
    bne x5,x21,L3
    beq x0,x0,EXIT
L3:
    addi x21,x0,0b1100111 
    addi x10,x0,2
    bne x5,x21,L4
    beq x0,x0,EXIT
L4:
    addi x21,x0,0b1110011
    addi x10,x0,2
    bne x5,x21,L5
    beq x0,x0,EXIT 
L5:
   addi x21,x0,0b1110011
    addi x10,x0,2
    bne x5,x21,L6
    beq x0,x0,EXIT
L6:
   addi x21,x0,0b1100011
    addi x10,x0,3
    bne x5,x21,L7
    beq x0,x0,EXIT
L7:
   addi x21,x0,0b0100011
    addi x10,x0,4
    bne x5,x21,L8
    beq x0,x0,EXIT     
L8:
   addi x21,x0,0b1101111
    addi x10,x0,5
    bne x5,x21,L9
    beq x0,x0,EXIT
L9:
   addi x21,x0,0b0110111
    addi x10,x0,6
    bne x5,x21,L10
    beq x0,x0,EXIT
L10:
    add x10,x0,x0       
    
EXIT:
    addi x10,x10,0    